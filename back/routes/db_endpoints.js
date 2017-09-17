'use strict';
var express = require('express');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');
//Data models
const User = require('../models/user');
const Pixel = require('../models/pixel');
//Private stuff... bitch.
const secrets = require('../private_info/secrets_real');
// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const BLOCK_PIXEL_CHANGE_TIMER = 10; //seconds

mongoose.Promise = Promise;
//Mongoose setup
mongoose.connect('mongodb://' + secrets.DB_USER + ':' + secrets.DB_PASS + '@ds161640.mlab.com:61640/samplesitedata', { useMongoClient: true });
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
  			
  			//console.log(colorCountStr);
			if(err){
				console.log("err: cant update pixel!");
			}else{

				var d = new Date();
				var now = Math.round(d.getTime() / 1000);
				var timeBack = Math.round(d.getTime() / 1000) - BLOCK_PIXEL_CHANGE_TIMER;

				var numberPixStr = 'numberPixelsChanged' + "";
				var timeDisabledStr = 'timeDisabled' + "";
				var updates = {};
				updates[numberPixStr] = 1;
				updates[color] = 1;
				//console.log(timeBack);

				//User.update({'userID': activeUser}, {$inc: query, $push:{ 'currentPixels': {posX: data.posX, posY: data.posY}}}, function(err){
				User.update({'userID': activeUser}, {$set: {'timeDisabled': now}, $inc: updates }, function(err){
					if(err){
						console.log("err: cant change user stats!");
						return;
					}
					//console.log("broadcasting updated pixel to all clients");
					//Send the pixel update broadcast
					io.emit('pixel_update', { posX: data.posX, posY: data.posY, hex: data.hex });
					//Send the feed info
					io.emit('feed_update', { posX: data.posX, posY: data.posY, color: color, hex: data.hex, user: activeUser});


					//Get the top 10 users by the number of pixels theyve changed.
					User.find({},['-_id', 'numberPixelsChanged', 'userID'], // Columns to Return
					{
					    skip:0, // Starting Row
					    limit:10, // Ending Row
					    sort:{
					        numberPixelsChanged: -1 //Sort by Date Added DESC
					    }
					},
					function(err,leaders){
						if(err){
							console.log("err: leaderboard loading error");
					    }
					    //console.log(leaders);
					    io.emit('leaderboard_update', { leaders: leaders});
					});
				});
			}
			
		});
  	});
});

//Changes the hex value from the client to a color string for db
function hexToColor(hex){
	var color = "";
	switch(hex) {
	    case '#d10000':
	        return 'Red';
	        break;
	    case '#ff6622':
	        return 'Orange';
	        break;
	    case '#ffda21':
	        return 'Yellow';
	        break;
		case '#33dd00':
	        return 'Green';
	        break;
	    case '#1133cc':
	        return 'Blue';
	        break;
	    case '#FF69B4':
	        return 'Pink';
	        break;
	    case '#330044':
	        return 'Purple';
	        break;
	    case '#000000':
	        return 'Black';
	        break;
	    case '#FFFFFF':
	        return 'White';
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

