const express = require('express');
const http = require('http');
const path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/presentation/index.html');
});
app.get('/master', function(req, res){
  res.sendFile(__dirname + '/presentation/master.html');
});

var server = http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000");
});

const io = require('socket.io')(server);
io.on('connection', function (socket) {
	// console.log('sending welcome')
  socket.emit("message", "Welcome to Revealer");
  socket.on("slidechanged", function(data){
		// console.log('got: ',data);
		socket.broadcast.emit("slidechanged", data);
	});
});

