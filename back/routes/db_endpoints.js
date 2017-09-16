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
	console.log(req.ip + ": performing initial render");

	var pixelArr = [];
	Pixel.find({}, '-_id posX posY currentColor', function(err, pixels) {
		if (err) {
			console.log();
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
  	socket.emit('pixelStream', { hello: 'world' });
  	socket.on('pixel_changed', function (data) {
  		console.log('User x: changed pixel (' + data.posX + "," + data.posY + ") to color " + data.color);
		Pixel.update({'posX': data.posX, 'posY': data.posY}, {$set: { 'currentColor': data.color }}, {upsert: true, strict: false}, function(err){res.status(500).send(err);});
  	});
});

//Gets user info from by a user ID.
router.get('/user/:userID', function (req, res) {
	console.log(req.ip + ': getting user info for ' + req.params.userID);
	User.findOne({ userID: req.params.userID }, '-_id -accountCreated')
		.then(user => {
			res.status(200).send(user);
		})
		.catch(err => {
			res.status(500).send(err);
		})
});

module.exports = router;

