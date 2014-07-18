var request = require('request')
,	express = require('express')
,	config = require('./config')
,	api = require('./api');

var express = require('express');
var app = express();

api.getPlayers( function(res) {
	console.log(res);
});