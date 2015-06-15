var controllers = require('./controllers'),
	express = require('express'),
	sio     = require('socket.io'),
	parser  = require('body-parser'),
	app		= express(),
	server  = require('http').createServer( app );



app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );
app.set( 'view options', { layout: false} );
app.use( parser.urlencoded({ extended: true }) );

/*app.get('/', function( req, res, next){
	models.Player.find({}, function(error, players ) {
		console.log(players);
    	res.render( 'index', { players: players } );
	} );
});

app.post('/player', function(req, res, next){
	new models.Player(req.body.player).save();
	res.render('player', req.body.player );
});
*/

app.get('/player/:object_id', function(req, res, next){

	controllers.playerController.player( req.params.object_id,function(error, player){
		res.render('player', player );
	}  );
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