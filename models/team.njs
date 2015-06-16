module.exports = function(mongoose, Player)
{
	var Schema = mongoose.Schema,

	Team = mongoose.model('Team', new Schema({
		name: String,
		players: [Player]
	}));

	return Team;
}