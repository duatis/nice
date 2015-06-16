console.log('\x1b[91mLoading:Controllers\x1b[39m');
var models = require('../models'), 
	playersController = require('./playerController.njs')(models.Player);

module.exports.playersController = playersController; 