console.log('\x1b[33mConnect Database\x1b[39m');
var mongoose 	= require('mongoose'), Models = {}, Player, Team;
	//mongoose.connect('mongodb://127.0.0.1/nice');
	mongoose.connect('mongodb://uwye9w36pi2vf30:z950QJSyG4CVqrQiD6BN@bce6i5tjfgzyjgi.mongodb.clvrcld.net:27017/bce6i5tjfgzyjgi');
	console.log('\x1b[33mLoading Models\x1b[39m');
	Player	= require('./player.njs')(mongoose);
	Team	= require('./team.njs')(mongoose);
	Game	= require('./game.njs')(mongoose);
	Action	= require('./action.njs')(mongoose);
	
var	Models = { 
			Player: Player,
			Team: 	Team,
			Game: 	Game,
			Action: Action
		};

	module.exports = Models;