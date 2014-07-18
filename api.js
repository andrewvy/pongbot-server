var config = require('./config'),
	request = require('request'),
	helpers = require('./helpers');

var api = {
	initialize: function() {
		api.api_server = config.api_server;
		api.slack_server = "https://slack.com";
		api.slack_token = config.slack_token;
	},
	endpointBuilder: function(params, cb) {
		var path = params.path || '/';
		var built = "http://" + api.api_server + '/api' + path;
		helpers.successMsg("API Path created: " + built);
		cb(built);
	},
	slackBuilder: function(params, cb) {
		var path = params.path || '/';
		var built = api.slack_server + '/api' + params.path;
		helpers.successMsg("Slack Path created: " + built);
		cb(built);
	},
	// Slack API Requests
	getSlackUsers: function(cb) {
		api.slackBuilder({path: '/users.list'}, function(url) {
			request.post(url, {form:{token: api.slack_token}}, function (err, res, body) {
				if (err) {
					helpers.errorMsg("Failed to getSlackUsers.");
					new Error(err);
				}
				cb(JSON.parse(body));
			});
		});
	},
	extractUserAvatars: function(arr) {
		var userAvatars = [];
		for (var i=0;i<arr.members.length;i++) {
			var u = {
				name: arr.members[i].name,
				avatar: arr.members[i].profile.image_48
			};
			userAvatars.push(u);
		}
		return userAvatars;
	},
	getUserAvatars: function(cb) {
		api.getSlackUsers( function(arr) {
			cb(api.extractUserAvatars(arr));
		});
	},
	// Pong API Requests
	getPlayers: function(cb) {
		api.endpointBuilder({path: '/rankings'}, function(url) {
			request(url, function (err, res, body) {
				if (err) {
					helpers.errorMsg("Failed to getPlayers");
					new Error(err);
				}
				if (!err && res.statusCode == 200) {
					cb(JSON.parse(body));
				}
			});
		});
	}
}

module.exports = api;