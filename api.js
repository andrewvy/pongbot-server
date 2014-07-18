var config = require('./config'),
	request = require('request');

var api = {
	api_server: config.api_server,
	endpointBuilder: function(params, cb) {
		this.path = params.path || '/';
		this.built = api.api_server + '/api' + this.path;
		cb(this.built);
	},
	getPlayers: function(cb) {
		api.endpointBuilder({path: '/getPlayers'}, function(url) {
			request(url, function (err, res, body) {
				if (!err && res.statusCode == 200) {
					cb(body);
				}
			});
		});
	}
}

module.exports = api;