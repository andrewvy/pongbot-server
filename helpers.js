var config = require('./config'),
	request = require('request'),
	fs = require('fs');

var Logger = function(name) {
	this.name = name || "Unnamed Task";
	this.startTime = new Date().getTime();
	this.done = function() {
		var e = new Date().getTime();
		var s = e - this.startTime;
		console.log("Task: " + this.name + " completed in " + s + "ms.");
	}
};

var helpers = {
	initialize: function() {
		helpers.image_users_path = "public/images/users/";
	},
	saveUserAvatars: function(arr) {
		var l = arr.length;
		var logger = new Logger("Save User Images");
		for (var i=0;i<arr.length;i++) {
			var path = helpers.image_users_path + arr[i].name + '.jpg';
			request(arr[i].avatar).pipe(fs.createWriteStream(path));
			if(i == arr.length - 1) {
				logger.done();
			}
		}
	}
};

module.exports = helpers;