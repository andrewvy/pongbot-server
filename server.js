var request = require('request')
,	express = require('express')
,	config = require('./config')
,	api = require('./api')
,	helpers = require('./helpers');

var express = require('express');
var app = express();

// Initialize modules

api.initialize();
helpers.initialize();

// Retrive new avatars, if there are any.

api.getUserAvatars(function(avatars) {
	helpers.saveUserAvatars(avatars);
});

// Start server and listen.

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});