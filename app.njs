console.log('\x1b[31mStarting app\x1b[39m');
var 
controllers = require('./controllers'),
express = require('express'),
sio     = require('socket.io'),
parser  = require('body-parser'),
app		= express(),
server  = require('http').createServer( app ),
io;

playersController 	= controllers.playersController;
teamsController 	= controllers.teamsController;

app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );
app.set( 'view options', { layout: false} );
app.use( parser.urlencoded({ extended: true }) );

server.listen(3000);
io = sio.listen( server );

console.log('\x1b[93mCreating routes\x1b[39m');
app.get('/', function( req, res, next)
{
	playersController.index(function(error, players ){
		teamsController.index( function(error, teams){
    		res.render( 'index', { players: players, teams: teams } );
		}
    	);
	} 
	);
});

app.post('/player', function(req, res, next){
	playersController.save(req.body.player, function(error, player){
		io.sockets.emit('newplayer', player );
		res.render('player', player );
	});
});

app.get('/player/:object_id', function(req, res, next){
		playersController.find( req.params.object_id,function(error, player){
			res.render('player', player );
		} 
	);
});

app.post('/team', function(req, res, next){
	teamsController.save(req.body.team, function(error, team){
		res.render('team',  {team:team, players: []}  );
	});
});

app.get('/team/:object_id', function(req, res, next){
		teamsController.find( req.params.object_id,function(err, team_data){
			playersController.index( {_id: { $not: {$in: team_data.team.players}}},function( err, players_left){
				team_data.all_players = players_left;
				console.log( team_data.all_players );
				res.render('team', team_data);
			});
		} 
	);
});

app.post('/team/:object_id/player', function( req, res, next ){
	teamsController.addPlayer(req.params.object_id, req.body.player, function( err, team){
		res.redirect('/team/' + team._id );
	});
});

app.get('/client', function(req, res, next){
	res.render('client');
});

console.log('\x1b[92mCreating socket\x1b[39m');
io.sockets.on( 'connection', function( socket ){
    playersController.index( {}, function(error, players){
    	socket.emit('first_data', players );	
    });
    
} );

process.stdin.on( 'data', function( data ){
    io.sockets.emit('in', data.toString() );

});

console.log('\x1b[32mApp started\x1b[39m\u0007\u0007\u0007');
