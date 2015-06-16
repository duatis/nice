var mongoose 	= require('mongoose'), Models = {}, Player, Team;
	mongoose.connect('mongodb://127.0.0.1/nice');
	Player	= require('./player.njs')(mongoose);
	Team	= require('./team.njs')(mongoose, Player);
	
	Models = { 
			Player: Player,
			Team: 	Team
		};

	module.exports = Models;