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
		action: { type: Schema.Types.ObjectId, ref: 'Action' },
		source:  { type: Schema.Types.ObjectId, ref: 'Player' },
		destiny: { type: Schema.Types.ObjectId, ref: 'Player' },
		team:  { type: Schema.Types.ObjectId, ref: 'Team' },
		comment: String 	
	}); 

	/**
	 * @var schema for the generated mongo document
	 */
	 schema = new Schema({
		name: String, 
		date: Date,
		teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
		actions: [Actions]
	});

	 schema.methods.addTeam = function( team_id, fn){
			this.teams.push( mongoose.Types.ObjectId(team_id) );
			this.save(fn);
	}

	 schema.methods.addAction = function( action, fn){
	 	console.log(action);
			this.actions.push( action );
			this.save(fn);
	}

	 /**
	 * @var creates the mongoose model that is the object of the class
	 */
	Game = mongoose.model( 'Game', schema );

	return Game;
}
