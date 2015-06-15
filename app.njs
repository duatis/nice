var controllers = require('./controllers'),
	express = require('express'),
	sio     = require('socket.io'),
	parser  = require('body-parser'),
	app		= express(),
	server  = require('http').createServer( app ),
	io;

	playersController = controllers.playersController;

	app.set( 'view engine', 'ejs' );
	app.set( 'views', __dirname + '/views' );
	app.set( 'view options', { layout: false} );
	app.use( parser.urlencoded({ extended: true }) );

	server.listen(3000);
	io = sio.listen( server );

app.get('/', function( req, res, next){

	playersController.index(function(error, players ) 
	{
    	res.render( 'index', { players: players } );
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
		playersController.player( req.params.object_id,function(error, player){
			res.render('player', player );
		} 
	);
});


app.get('/client', function(req, res, next){
	res.render('client');
});


io.sockets.on( 'connection', function( socket ){
    playersController.index(function(error, players){
    	socket.emit('first_data', players );	
    });
    
} );

process.stdin.on( 'data', function( data ){
    io.sockets.emit('in', data.toString() );

});
