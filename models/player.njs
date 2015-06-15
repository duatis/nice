module.exports = function(mongoose)
{
	var Schema = mongoose.Schema,

	Player = mongoose.model('Player', new Schema({
		name: String
	  , number: String
	}));

	return Player;
}

console.log('player loaded');

