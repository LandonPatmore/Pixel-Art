'use strict';
var express = require('express');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Pixel = require('../models/pixel');

mongoose.Promise = Promise;
// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Mongoose setup
mongoose.connect('mongodb://PixelArtAPI:apipasspixelart@ds161640.mlab.com:61640/samplesitedata', { useMongoClient: true });
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(3000);

//Sends all the current pixel data to the client.
router.get('/initialRender', function (req, res) {
	//console.log(getOurTime() + " - " + req.ip + ": performing initial render");

	var pixelArr = [];
	Pixel.find({}, '-_id posX posY currentHex', function(err, pixels) {
		if (err) {
			console.log("err: cant find get pixels");
			res.status(500);
		}else{
		    pixels.forEach(function(pixel) {
		    	var string = JSON.stringify(pixel);
				var objectValue = JSON.parse(string);
		    	pixelArr.push(objectValue);
		    });
			res.json(pixelArr);
		}
	});
});

//Just for testing
router.get('/', function (req, res) {
	console.log(req.ip + ': at API index');
	res.sendFile( __dirname + '/socket.html' );
});

//Pixel changed stream
io.on('connection', function (socket) {
  	socket.on('pixel_changed', function (data) {
  		var activeUser = "username123";
  		var color = hexToColor(data.hex);

  		Pixel.update({'posX': data.posX, 'posY': data.posY, $or:[ {'currentHex': {$ne : data.hex}}, {'currentOwner': {$ne : activeUser}}] }, {$set: { 'currentColor': color, 'currentOwner': activeUser, 'currentHex': data.hex }, $push:{ 'pastColors': data.color, 'pastOwners': activeUser }}, { new: true, strict: false}, function(err){
  			var colorCountStr = 'colorCounts.' + color;
  			console.log(colorCountStr);
			if(err){
				console.log("err: cant update pixel!");
			}else{
				User.update({'userID': activeUser}, {$inc: {numberPixelsChanged: 1, 'colorCounts.blue': 1}}, function(err){
					if(err){
						console.log("err: cant change user stats!");
					}
				});
			}
			console.log("broadcasting updated pixel to all clients");
			io.emit('pixel_update', { posX: data.posX, posY: data.posY, hex: data.hex });
		});
  	});
});

//Changes the hex value from the client to a color string for db
function hexToColor(hex){
	var color = "";
	switch(hex) {
	    case '#d10000':
	        return 'red';
	        break;
	    case '#ff6622':
	        return 'orange';
	        break;
	    case '#ffda21':
	        return 'yellow';
	        break;
		case '#33dd00':
	        return 'green';
	        break;
	    case '#1133cc':
	        return 'blue';
	        break;
	    case '#FF69B4':
	        return 'pink';
	        break;
	    case '#330044':
	        return 'purple';
	        break;
	    case '#000000':
	        return 'black';
	        break;
	    case '#FFFFFF':
	        return 'white';
	        break;
	    default:
	        return '';
	}
}

function getOurTime(){
	var d = new Date(); // for now
	return d.getHours() + ":" + d.getMinutes(); + ":" + d.getMinutes();
}


module.exports = router;

