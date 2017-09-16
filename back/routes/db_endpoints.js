'use strict';
const express = require('express');
const router = express.Router();
const mongo = require('mongoose');

var server = require('http').Server(express);
var io = require('socket.io')(server);

server.listen(5000);

router.get('/', function (req, res) {
	console.log("We got a visitor");
  res.sendFile(__dirname + '/socket.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = router;