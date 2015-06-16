console.log('\x1b[33mLoading:Player\x1b[39m');
module.exports = function(mongoose)
{
	var Schema = mongoose.Schema,

	Player = mongoose.model('Player', new Schema({
		name: String
	  , number: Number
	}));

	return Player;
}
