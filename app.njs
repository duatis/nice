var models 	= require('./models'),
	express = require('express'),
	sio     = require('socket.io'),
	parser  = require('body-parser'),
	app		= express(),
	server  = require('http').createServer( app );



app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );
app.set( 'view options', { layout: false} );
app.use( parser.urlencoded({ extended: true }) );

app.get('/', function( req, res, next){
    res.render( 'index' );
});

app.post('/player', function(req, res, next){
	new models.Player(req.body.player).save();
	res.render('player', req.body.player );
});

server.listen(3000);
var io = sio.listen( server );

io.sockets.on( 'connection', function( socket ){
    console.log('socket.connected');
} );


process.stdin.on( 'data', function( data ){
    io.sockets.emit('in', data.toString() );

});


console.log('app loaded');