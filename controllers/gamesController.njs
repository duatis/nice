/**
 * @brief Controller form Games
 * 
 * @param  Game Player mongoose Player model
 */
module.exports = function(Game, Team){
	var self = {};

	/**
	 * @brief find a single player with _id = object_id
	 * @details [long description]
	 * @param object_id string to match _id of the player		
	 * @param fn function callback for mongoose query. format (err, player) -> 
	 * 
	 * @return void
	 */
	self.find = function( object_id, fn )
	{
		var promise =  Game.findOne( {_id: object_id}, function(err, game){
			Team.find({_id:{$in: game.teams}}, function(err, teams){
					if(err){
						teams = [];
					}
					if(fn)fn(err, {game: game, teams: teams})
			});
		});

		return promise;
	}

	/**
	 * @brief return all the Games matching params
	 * 
	 * @param params object params for the mongo query
	 * @param fn function callback for mongoose. (err, Game) -> 
	 * 
	 * @return void
	 */
	self.index = function(params,fn)
	{
		Game.find(params).exec(fn);
	}

	/**
	 * @brief saves a Game to the database
	 * 
	 * @param data object data for the new document
	 * @param fn function mongoose callback. (err, Game) -> 
	 * 
	 */
	self.save = function( data, fn )
	{
		new Game(data).save(fn);
	}


	/**
	 * Pushes a team reference to teams array using model's addTeam function
	 * @param game_id objectId 	the game to push the team on
	 * @param team_id objectID	team to be pushed
	 * @param fn function callback function
	 * @return [description]
	 */
	self.addTeam = function( game_id, team_id, fn )
	{
		Game.findOne({_id: game_id}, function( err, game){
			game.addTeam(team_id, fn);
		});
	}


	/**
	 * retrieves the full populated information about a game, including players, and teams
	 */
	 self.get = function(game_id, fn)
	 {
	 	Game.findOne({_id: game_id}).populate('teams').exec( function(err, game){
	 		Team.populate(game.teams, {path:'players'}, function(err, players){
	 			fn(err,{game: game, teams: game.teams});	
	 		});
	 	});
	 }

	 self.addAction = function(game_id, action, fn)
	 {
	 	Game.findOne({_id: game_id}, function( err, game){
			game.addAction(action, fn);
		});
	 }

	return self;
}