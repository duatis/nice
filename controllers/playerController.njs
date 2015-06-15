module.exports = function(Player){
	this.player = function( object_id, fn )
	{
		Player.findOne( {_id: object_id}, fn );
	}

	return this;
}