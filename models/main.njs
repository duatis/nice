var mongoose 	= require('mongoose'), 
	Player		= require('./player.njs')(mongoose);

mongoose.connect('mongodb://127.0.0.1/nice');

console.log('models loaded');