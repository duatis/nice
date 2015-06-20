/**
 * @brief Model for Team management
 * 
 * @param  mongoose Mongoose Reference to mongoose connection
 * @return Mongoose model form team
 */
module.exports = function(mongoose)
{
	var Schema = mongoose.Schema, Team;
	/**
	 * @var schema for the generated mongo document
	 */
	schema = new Schema({
		name: String,
		players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
	});

	/**
	 * @brief Add a player with _id equal to ObjectId(player_id)
	 * @details [long description]
	 * 
	 * @param player_id The _id to reference the Player
	 * @param fn callback to call after save function. Should hace structure:
	 * function(error, Team){}
	 */
	schema.methods.addPlayer = function( player_id, fn){
			this.players.push( mongoose.Types.ObjectId(player_id) );
			this.save(fn);
	}

	/**
	 * @var creates the mongoose model that is the object of the class
	 */
	Team = mongoose.model('Team', schema);

	return Team;
}