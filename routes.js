var Model = require('./models/Model');

var routes = {
	index: function (req, res) {
		var users = Model.Users.get();
		var renderModel = {users: users};
		res.render('index', renderModel);
	}
};

module.exports = routes;