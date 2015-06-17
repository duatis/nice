/**
 * @brief Controller form players
 * 
 * @param  Player Player mongoose Player model
 */
module.exports = function(Player){
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
		Player.findOne( {_id: object_id}, fn );
	}

	/**
	 * @brief return all the players matching params
	 * 
	 * @param params object params for the mongo query
	 * @param fn function callback for mongoose. (err, player) -> 
	 * 
	 * @return void
	 */
	self.index = function(params,fn)
	{
		Player.find(params).exec(fn);
	}

	/**
	 * @brief saves a player to the database
	 * 
	 * @param data object data for the new document
	 * @param fn function mongoose callback. (err, player) -> 
	 * 
	 */
	self.save = function( data, fn )
	{
		new Player(data).save(fn);
	}

	return self;
}