var models = require('../models'), playerController = require('./playerController.njs')(models.Player);

module.exports.playerController = playerController; 