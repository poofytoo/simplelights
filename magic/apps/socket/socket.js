var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var SerialConnection = require('../../lib/service');
var Commands = require('../../lib/commands');

var serv = new SerialConnection();    // Establish Serial Connection
var cmd = new Commands(serv); 

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  socket.on('msg', function (data) {
    try
    {
      at = eval(data);
      if (at != null){
        socket.emit('errormsg', at); // This function is mad scary
      }
    }
  catch(err)
    {
      console.log('data sent: ' + data)
      console.log(err);
      socket.emit('errormsg', err.toString());
    }
  });
});
