console.log('\x1b[33mConnect Database\x1b[39m');
var mongoose 	= require('mongoose'), Models = {}, Player, Team;
	mongoose.connect('mongodb://127.0.0.1/nice');
	console.log('\x1b[33mLoading Models\x1b[39m');
	Player	= require('./player.njs')(mongoose);
	Team	= require('./team.njs')(mongoose, Player);
	
var	Models = { 
			"Player": Player,
			"Team": 	Team
		};

	module.exports = Models;