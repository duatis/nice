console.log('\x1b[91mLoading Controllers\x1b[39m');
var models 				= require('../models'); 
	playersController 	= require('./playersController.njs')(models.Player);
	teamsController 	= require('./teamsController.njs')(models.Team, models.Player);
	gamesController 	= require('./gamesController.njs')(models.Game, models.Team, models.Action, models.Player);
	actionsController 	= require('./actionsController.njs')(models.Action);

	module.exports.playersController 	= playersController; 
	module.exports.teamsController 		= teamsController; 
	module.exports.gamesController 		= gamesController; 
	module.exports.actionsController 	= actionsController; 