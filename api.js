var config = require('./config'),
	request = require('request');

var api = {
	initialize: function() {
		api.api_server = config.api_server;
		api.slack_server = "https://slack.com";
		api.slack_token = config.slack_token;
	},
	endpointBuilder: function(params, cb) {
		var path = params.path || '/';
		var built = "http://" + api.api_server + '/api' + path;
		cb(built);
	},
	slackBuilder: function(params, cb) {
		var path = params.path || '/';
		var built = api.slack_server + '/api' + params.path;
		cb(built);
	},
	unescape: function(str) {
		return str.replace(/\\"/g, '"');
	},
	// Slack API Requests
	getSlackUsers: function(cb) {
		api.slackBuilder({path: '/users.list'}, function(url) {
			console.log(url);
			request.post(url, {form:{token: api.slack_token}}, function (err, res, body) {
				cb(JSON.parse(body));
			});
		});
	},
	extractUserAvatars: function(arr) {
		var userAvatars = [];
		for (var i=0;i<arr.members.length;i++) {
			var u = {
				name: arr.members[i].name,
				avatar: arr.members[i].profile.image_24
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
				if (!err && res.statusCode == 200) {
					cb(body);
				}
			});
		});
	}
}

module.exports = api;