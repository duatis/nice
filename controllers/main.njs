console.log('\x1b[91mLoading Controllers\x1b[39m');
var models 				= require('../models'); 
	playersController 	= require('./playersController.njs')(models.Player);
	teamsController 	= require('./teamsController.njs')(models.Team, models.Player);

	module.exports.playersController 	= playersController; 
	module.exports.teamsController 		= teamsController; 