var config = require('./config'),
	request = require('request'),
	fs = require('fs'),
	colors = require('colors'),
	Model = require('./models/Model');

var Logger = function(name) {
	this.name = name || "Unnamed Task";
	this.startTime = new Date().getTime();
};

Logger.prototype.done = function() {
	var e = new Date().getTime();
	var s = e - this.startTime;
	var msg = "Task: " + this.name + " completed in " + s + "ms.";
	console.log(msg.green);
};

Logger.prototype.fail = function() {
	var e = new Date().getTime();
	var s = e - this.startTime;
	var msg = "Task: " + this.name + " failed in " + s + "ms."
	console.log(msg.red);
}

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
	},
	unescape: function(str) {
		return str.replace(/\\"/g, '"');
	},
	successMsg: function(str) {
		console.log(str.bold);
	},
	errorMsg: function(str) {
		console.log(str.italics.red);
	},
	pruneUsers: function(playerData) {
		var logger = new Logger("Pruning User Data");
		var users = Model.Users.get();
		var newUsers = [];
		for (var i=0;i<playerData.length;i++) {
			for (var k=0;k<users.length;k++) {
				if (playerData[i].user_name == users[k].name) {
					newUsers.push(users[k]);
					break;
				}
			}
			if(i == playerData.length - 1) {
				logger.done();
				Model.Users.initialize(newUsers);
			}
		}
	},
	addPlayerDataToUsers: function(playerData) {
		var logger = new Logger("Merging Player Data with Users");
		for (var i=0;i<playerData.length;i++) {
			var un = playerData[i].user_name;
			var params = {
				wins: playerData[i].wins,
				losses: playerData[i].losses,
				elo: playerData[i].elo,
				tau: playerData[i].tau
			};
			Model.Users.set(un, params);
			if(i == playerData.length - 1) {
				logger.done();
			}
		}
	}
};

module.exports = helpers;
module.exports.Logger = Logger;