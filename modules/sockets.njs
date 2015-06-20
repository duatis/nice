/**
 * Module to handle connections with clients through TCP socket
 * Client will be served all available games and it should choose which one it * wants to connect to. Once this is done the cliend will receive all the 
 * information about the game and wait for events emmited related to 
 * the current game identified by its _id.
 * @param server httpServer the server to connect the socket
 */
module.exports = function(server)
{	
	var self, sio = require('socket.io'), Models = require('../models');

	self = {
		io: sio.listen(server)
	};

	/**
	 * Send available games
	 */
	self.io.on('connection', function(socket){
		 Models.Game.find(function(err, games){
		 	socket.emit('first_data', games);

		 	socket.on('connect_to', function(id){
				Models.Game.findOne({_id: id}).populate('teams').exec( function(err, game){
					socket.emit('game', game);
					Models.Team.find({_id:{$in: game.teams}}).populate('players').exec( function(err, teams){
						socket.emit('teams',teams);
					});
				});
			});

		 });	
	} );

	return self;

}