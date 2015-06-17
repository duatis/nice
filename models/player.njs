/**
 * @brief Model for Team management
 * 
 * @param  mongoose Mongoose Reference to mongoose connection
 * @return Mongoose model form player
 */
module.exports = function(mongoose)
{
	var Schema = mongoose.Schema;

	/**
	 * @var schema for the generated mongo document
	 */
	 schema = new Schema({
		name: String
	  , number: Number
	});

	 /**
	 * @var creates the mongoose model that is the object of the class
	 */
	Player = mongoose.model( 'Player', schema );

	return Player;
}
