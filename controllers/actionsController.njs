/**
 * @brief Controller form players
 * 
 * @param  Player Player mongoose Player model
 */
module.exports = function(Action){
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
		Action.findOne( {_id: object_id}, fn );
	}

	/**
	 * @brief return all the Actions matching params
	 * 
	 * @param params object params for the mongo query
	 * @param fn function callback for mongoose. (err, Action) -> 
	 * 
	 * @return void
	 */
	self.index = function(params,fn)
	{
		Action.find(params).exec(fn);
	}

	/**
	 * @brief saves a Action to the database
	 * 
	 * @param data object data for the new document
	 * @param fn function mongoose callback. (err, Action) -> 
	 * 
	 */
	self.save = function( data, fn )
	{
		new Action(data).save(fn);
	}

	self.actionTypes = Action.types;

	return self;
}