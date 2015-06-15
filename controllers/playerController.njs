module.exports = function(Player){
	this.player = function( object_id, fn )
	{
		Player.findOne( {_id: object_id}, fn );
	}

	this.index = function(fn)
	{
		Player.find(fn);
	}

	this.save = function( data, fn )
	{
		new Player(data).save(fn);
	}

	return this;
}