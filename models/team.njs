module.exports = function(mongoose)
{
	var Schema = mongoose.Schema;

	schema = new Schema({
		name: String,
		players: []
	});

	schema.methods.addPlayer = function( player_id, fn){
			this.players.push(player_id);
			this.save(fn);
	}

	Team = mongoose.model('Team', schema);

	return Team;
}