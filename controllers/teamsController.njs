module.exports = function(Team, Player){
	var self = {};
	self.find = function( object_id, fn )
	{
		Team.findOne( {_id: object_id}, function(err, team){
			Player.find({_id:{$in: team.players}}, function(err, players){
					if(err)players = [];
					fn(err, {team: team, players: players})
				}
			);
		} );
	}

	self.index = function(fn)
	{
		Team.find(fn);
	}

	self.save = function( data, fn )
	{
		new Team(data).save(fn);
	}

	self.addPlayer = function( team_id,player_id, fn )
	{
		Team.findOne({_id: team_id}, function( err, team){
			team.addPlayer(player_id, fn);
		});
	}

	return self;
}