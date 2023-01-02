require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path');

var publicPath = path.join(__dirname, 'public')

// Serve P5 files
app.use(express.static(path.join(__dirname, 'public')));

const socketIO = require("socket.io");

const server = app.listen(3002, () => {
	console.log("Community - listening on port 3002!");
});

const io = socketIO(server);