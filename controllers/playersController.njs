module.exports = function(Player){
	var self = {};
	self.Player = Player;
	self.find = function( object_id, fn )
	{
		Player.findOne( {_id: object_id}, fn );
	}

	self.index = function(fn)
	{
		Player.find().sort({number: 1}).exec(fn);
	}

	self.save = function( data, fn )
	{
		new Player(data).save(fn);
	}

	return self;
}