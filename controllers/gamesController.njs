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
		Game.findOne( {_id: object_id}, function(err, game){
			console.log(game.teams);
			Team.find({_id:{$in: game.teams}}, function(err, teams){
					if(err)teams = [];
					fn(err, {game: game, teams: teams})
			});
		});
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

	return self;
}