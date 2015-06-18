/**
 * @brief Model for Team management
 * 
 * @param  mongoose Mongoose Reference to mongoose connection
 * @return Mongoose model form player
 */
module.exports = function(mongoose)
{
	var Schema = mongoose.Schema, schema, Game, Actions, ObjectId = Schema.ObjectId;

	/**
	* @var schema for game actions
	*/
	Actions = new Schema({
		time: Number,
		action: ObjectId,
		source: ObjectId,
		destiny:ObjectId,
		comment: String 	
	}); 

	/**
	 * @var schema for the generated mongo document
	 */
	 schema = new Schema({
		name: String, 
		date: Date,
		teams: [],
		actions: [Actions]
	});

	 /**
	 * @var creates the mongoose model that is the object of the class
	 */
	Game = mongoose.model( 'Game', schema );

	return Game;
}
