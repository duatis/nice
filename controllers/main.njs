var models = require('../models'), 
	playersController = require('./playerController.njs')(models.Player);

module.exports.playersController = playersController; 