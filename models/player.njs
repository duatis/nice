module.exports = function(mongoose)
{
	var Schema = mongoose.Schema,

	Player = mongoose.model('Player', new Schema({
		name: String
	  , number: Number
	}));

	return Player;
}
