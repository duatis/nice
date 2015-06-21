console.log('\x1b[31mStarting app\x1b[39m');
var 
controllers = require('./controllers'),
express = require('express'),
//sio     = require('socket.io'),
parser  = require('body-parser'),
app		= express(),
server  = require('http').createServer( app ),
port	= 8080, 
io 		= require('./modules/sockets.njs');

playersController 	= controllers.playersController;
teamsController 	= controllers.teamsController;

app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );
app.set( 'view options', { layout: false} );
app.use( parser.urlencoded({ extended: true }) );

server.listen(port);
io(server);

console.log('\x1b[93mCreating routes\x1b[39m');
app.get('/', function( req, res, next)
{
	playersController.index(function(error, players ){
		teamsController.index( function(error, teams){
			gamesController.index(function(error, games){
				actionsController.index( function(error, actions){
    				res.render( 'index', { players: players, teams: teams, games: games, actions: actions });
    			});
    		});
		});
	});
});

app.post('/player', function(req, res, next){
	playersController.save(req.body.player, function(error, player){
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
		res.redirect('/team/' + team._id );
	});
});

app.get('/team/:object_id', function(req, res, next){
		teamsController.find( req.params.object_id,function(err, team_data){
			playersController.index( {_id: { $not: {$in: team_data.team.players}}},function( err, players_left){
				team_data.all_players = players_left;
				res.render('team', team_data);
			});
		} 
	);
});

app.post('/game', function(req, res, next){
	gamesController.save(req.body.game, function(error, game){
		res.redirect('/game/' + game._id );
	});
});

app.get('/game/:object_id', function(req, res, next){
		gamesController.get(req.params.object_id);
		gamesController.find( req.params.object_id,function(err, game_data){
			teamsController.index( {_id: { $not: {$in: game_data.game.teams}}},function( err, teams_left){
				game_data.all_teams = teams_left;
				res.render('game', game_data);
			});
		} 
	);
});


app.post('/game/:object_id/team', function( req, res, next ){
	gamesController.addTeam(req.params.object_id, req.body.team, function( err, game){
		res.redirect('/game/' + game._id );
	});
});

app.post('/team/:object_id/player', function( req, res, next ){
	teamsController.addPlayer(req.params.object_id, req.body.player, function( err, team){
		res.redirect('/team/' + team._id );
	});
});

app.get('/client', function(req, res, next){
	res.render('client');
});


app.get('/action/:object_id', function(req, res, next){
		actionsController.find( req.params.object_id,function(error, action){
			res.render('action', action );
		} 
	);
});

app.post('/action', function(req, res, next){
	actionsController.save(req.body.action, function(error, action){
		res.redirect('/action/' + action._id );
	});
});

app.post('/game/:object_id/action', function( req, res, next){

	if( '' == req.body.action.action ) return;
	if( '' == req.body.action.source) delete req.body.action.source;
	if( '' == req.body.action.destiny ) delete req.body.action.destiny;
	
	gamesController.addAction(req.params.object_id, req.body.action, function(err, action){
		if(err)console.log(err);
		 res.setHeader('Content-Type', 'application/json');
    	 res.send(JSON.stringify( action, null, 3));
	});
});

app.get('/game/:object_id/in_game',function( req, res, next ){
	actionsController.index( function(err, actions){
		gamesController.get(req.params.object_id, function( err, data ){
			data.actions = actions;
			res.render('in_game', data);
		});
	});
});


console.log('\x1b[32mApp started\x1b[39m\u0007\u0007\u0007');