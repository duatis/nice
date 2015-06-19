/**
 * @brief Model for Action management
 * 
 * @param  mongoose Mongoose Reference to mongoose connection
 * @return Mongoose model form player
 */
module.exports = function(mongoose)
{
	var Schema = mongoose.Schema, Action;

	Action = {
		types:{
			SINGLE: 1,
			DUAL:   2,
			TEAM: 	3,
			GAME: 	4
		}	
	};


	/**
	 * @var schema for the generated mongo document
	 */
	 schema = new Schema({
		name: String,
		type: Number
	});

	 /**
	 * @var creates the mongoose model that is the object of the class
	 */
	Action = mongoose.model( 'Action', schema );

	return Action;
}
