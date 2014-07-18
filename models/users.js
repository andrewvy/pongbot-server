var api = require('../api')
,	helpers = require('../helpers');

var Users = {
	initialize: function(users) {
		Users.users = users;
	},
	get: function() {
		return Users.users;
	},
	set: function(user_name, params) {
		var i = this._findUser(user_name);
		Object.keys(params).forEach( function(key) {
			Users.users[i][key] = params[key];
		});
	},
	_findUser: function(user_name) {
		for (var i=0;i<Users.users.length;i++) {
			if (Users.users[i].name === user_name) {
				return i;
			}
		}
	}
}

module.exports = Users;