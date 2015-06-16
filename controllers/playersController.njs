module.exports = function(Player){
	var self = {};
	self.find = function( object_id, fn )
	{
		Player.findOne( {_id: object_id}, fn );
	}

	self.index = function(fn)
	{
		Player.find(fn);
	}

	self.save = function( data, fn )
	{
		new Player(data).save(fn);
	}

	return self;
}