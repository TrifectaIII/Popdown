// SETUP
///////////////////////////////////////////////////

var express = require('express'); // load express package
var app = express(); //create express app
var serv = require('http').Server(app); //serve http over app

//build Popdown.js file
require(__dirname + '/build.js');


// HTTP SERVER
///////////////////////////////////////////////////

//Start Server
serv.listen(process.env.PORT || 8000); // specified port or 8k as backup

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/Popdown.js',function(req, res) {
	res.sendFile(__dirname + '/Popdown.js');
});

//Serve static files
app.use('/client',express.static(__dirname + '/client'));


console.log('Listening on Port:', process.env.PORT || 8000);