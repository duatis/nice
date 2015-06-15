var mongoose 	= require('mongoose'),
	Player;
	mongoose.connect('mongodb://127.0.0.1/nice');
	Player	= require('./player.njs')(mongoose);
	module.exports.Player = Player;