var request = require('request')
,	express = require('express')
,	config = require('./config')
,	api = require('./api')
,	helpers = require('./helpers')
,	routes = require('./routes');

// Models
var Model = require('./models/Model');

var express = require('express')
,	app = express()
,	log = new helpers.Logger("Server Instantiated on Port " + config.port);

// Initialize modules

api.initialize();
helpers.initialize();

// Settings
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

// Retrive new avatars, if there are any. Store in users model.

api.getUserAvatars(function(avatars) {
	helpers.saveUserAvatars(avatars);
	Model.Users.initialize(avatars);
	api.getPlayers(function(playerData) {
		helpers.addPlayerDataToUsers(playerData);
	});
});

// Fetch and merge in player data with users.

// Routes
app.get('/', routes.index);
// Start server and listen.
app.listen(config.port);
log.done();
