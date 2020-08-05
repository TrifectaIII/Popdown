// SETUP
///////////////////////////////////////////////////

const path = require('path');

// THE EXPRESS AND HTTP MODULES ARE NOT REQUIRED BY THIS PACKAGE, 
// SO MANUAL INSTALLATION MAY BE NECESSARY
const express = require('express'); // load express package
const app = express(); //create express app
const serv = require('http').Server(app); //serve http over app

//grab build functions and execure
const Popdown = require(path.resolve(__dirname, '../build.js'));
Popdown.buildFiles();

// HTTP SERVER
///////////////////////////////////////////////////

const port = process.env.PORT || 8000; // specified port or 8k as backup

//Start Server
serv.listen(port);

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(path.resolve(__dirname, 'test.html'));
});

//send library
app.get('/Popdown.js',function(req, res) {
    res.send(Popdown.buildFiles().full);
});

//send minified library
app.get('/Popdown.min.js',function(req, res) {
    res.send(Popdown.buildFiles().minified);
});

//Serve test files
app.use('/test',express.static(path.resolve(__dirname)));


console.log('Listening on Port:', port);