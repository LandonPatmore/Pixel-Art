'use strict';
var express = require('express');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Pixel = require('../models/pixel');

mongoose.Promise = Promise;


//Mongoose setup
mongoose.connect('mongodb://PixelArtAPI:apipasspixelart@ds161640.mlab.com:61640/samplesitedata', { useMongoClient: true });
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Login route
router.post('/login', function(req, res){
	if(!req.body.username){
		res.status(400).send('username required');
		return;
	}

	if(!req.body.password){
		res.status(400).send('password required');
		return;
	}	

	User.findOne({username: req.body.username}, function(err, user){
		user.comparePassword(req.body.password, function(err, isMatch) {
			if (err) throw err;
			if(!isMatch){
				res.status(401).send('Invalid Password');
			}else{
				res.status(200).json({});
			}
		});
	});
});

//var secrets = require('./secrets');

//Gets all user info from by a user ID.
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