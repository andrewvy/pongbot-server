var Users = require('./models/users');

var routes = {
	index: function (req, res) {
		res.render('index');
	}
};

module.exports = routes;