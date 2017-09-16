'use strict';
var express = require('express');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Pixel = require('../models/pixel');

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Mongoose setup
mongoose.connect('mongodb://PixelArtAPI:apipasspixelart@ds161640.mlab.com:61640/samplesitedata', { useMongoClient: true });
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


server.listen(3000);

router.get('/', function (req, res) {
	console.log("We got a visitor");
		

		// Pixel.findOne({ pixelID: "000X000" })
		// 	.then(pixel => {
		// 		//res.send(200, pixel)
		// 		console.log("STUF" + pixel);
		// 		next()
		// 	})
		// 	.catch(err => {
		// 		//res.send(500, err)
		// 	})

  res.sendFile(__dirname + '/socket.html');
});

io.on('connection', function (socket) {
		Pixel.find({}, '-_id posX posY currentColor', function(err, pixels) {
	    	var pixelArr = [];

		    pixels.forEach(function(pixel) {
		    	console.log("from db " + pixel);
		    	var string = JSON.stringify(pixel);
       			var objectValue = JSON.parse(string);
		    	pixelArr.push(objectValue);
		    });
		    
		    socket.emit('pixelStream', pixelArr);
		});



  socket.emit('news', { hello: 'world' });
  socket.on('pixel_changed', function (data) {
    console.log(data);
  });
});

module.exports = router;