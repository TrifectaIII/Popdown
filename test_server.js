// SETUP
///////////////////////////////////////////////////

const path = require('path');

const express = require('express'); // load express package
const app = express(); //create express app
const serv = require('http').Server(app); //serve http over app

//build Popdown.js file
const build = require(path.resolve(__dirname, 'build.js'));

// HTTP SERVER
///////////////////////////////////////////////////

const port = process.env.PORT || 8000; // specified port or 8k as backup

//Start Server
serv.listen(port);

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(path.resolve(__dirname, 'test/test.html'));
});

//send library
app.get('/Popdown.js',function(req, res) {
    //change from buildFile to buildString if you dont want to acutally change the file on disk
    res.send(build.buildFiles().regular);
});

//send minified library
app.get('/Popdown.min.js',function(req, res) {
    //change from buildFile to buildString if you dont want to acutally change the file on disk
    res.send(build.buildFiles().minified);
});

//Serve test files
app.use('/test',express.static(path.resolve(__dirname, 'test')));


console.log('Listening on Port:', port);