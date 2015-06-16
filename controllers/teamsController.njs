module.exports = function(Team){
	var self = {};
	self.find = function( object_id, fn )
	{
		Team.findOne( {_id: object_id}, fn );
	}

	self.index = function(fn)
	{
		Team.find(fn);
	}

	self.save = function( data, fn )
	{
		new Team(data).save(fn);
	}

	return self;
}