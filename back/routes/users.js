'use strict';
var express = require('express');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Pixel = require('../models/pixel');
const secrets = require('../private_info/secrets_real');

mongoose.Promise = Promise;

//Mongoose setup
//mongoose.connect('mongodb://' + secrets.DB_USER + ':' + secrets.DB_PASS + '@ds161640.mlab.com:61640/samplesitedata', { useMongoClient: true });
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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