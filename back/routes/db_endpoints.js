'use strict';
const express = require('express');
const router = express.Router();
const mongo = require('mongoose');
// const secrets = require('../private_info/secrets_real');

//Collections for DB
// var db = mongo(secrets.DB_USER + ':' + secrets.DB_PASS + '@potdb-shard-00-02-7empe.mongodb.net:27017,potdb-shard-00-00-7empe.mongodb.net:27017,potdb-shard-00-01-7empe.mongodb.net:27017/package_ontime?ssl=true&replicaSet=potdb-shard-0&authSource=admin', ['area_statistics, package_hashes, total_statistics, waiting_packages, test_co']);

// function isEmpty(obj) {
// 	for (var key in obj) {
// 		if (obj.hasOwnProperty(key))
// 			return false;
// 	}
// 	return true;
// }

// router.get('/total_statistics', function (req, res, next) {
// 	db.total_statistics.findOne(function (err, stats) {
// 		if (err) {
// 			res.status(400);
// 		} else {
// 			res.status(200).send(stats);
// 		}
// 	});
// });

// router.get('/state/:state', function (req, res, next) {
// 	console.log(req.params.state);
// 	db.area_statistics.findOne({ state: req.params.state }, function (err, state) {
// 		if (err) {
// 			console.log('error state');
// 			res.status(400);
// 		} else {
// 			if (state !== null) {
// 				console.log(state);
// 				res.status(200).send(state);
// 			} else {
// 				db.area_statistics.insert({
// 					"state": req.params.state, "zips": [
// 						{
// 							"zip": "00000",
// 							"g_perc": "0%",
// 							"a_perc": "0%",
// 							"e_perc": "0%",
// 							"g_time": "00:00",
// 							"a_time": "00:00",
// 							"e_time": "00:00",
// 							"total_packages": "0"
// 						}
// 					]
// 				}, function (error, addState) {
// 					if (error) {
// 						console.log(error);
// 						res.state(400);
// 					} else {
// 						console.log('state added');
// 						res.status(200).send(addState);
// 					}
// 				});
// 			}
// 		}
// 	});
// });



module.exports = router;