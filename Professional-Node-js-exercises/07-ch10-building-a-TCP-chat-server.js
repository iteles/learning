var net = require('net');

var server = net.createServer();

//setting up an array to hold all the connections in one central place
var sockets =[];

//setting up the server to accept new connections
server.on('connection', function(socket) {
  console.log('got a new connection');

  //when there's a new connection, add it to our central storage location
  sockets.push(socket);

  //reading data from connections
  socket.on('data', function(data) {
    console.log('got data: '+ data);

    //If the data is not the same data in the use's socket (connection), send the data to that use
    sockets.forEach(function(otherSocket) {
      if (otherSocket !== socket) {
        otherSocket.write(data);
      }
    });
  }); //end of socket.on('data', etc)

  //removing connections from our central repository (sockets[])
  socket.on('close', function() {
    console.log('connection closed');
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1); //when a socket closes, remove it from the sockets array
  });
}); //end of server.on('connection', etc)

//NOTE, if I try to do something with sockets out here, it won't work, has to be inside the server.on('connection', etc)
//because it's when a connection is created that the socket object is created

//basic error handling
server.on('error', function(err) {
    console.log('Server error: ', err.mesage);
});

//basic notification of server close
server.on('close', function(err) {
    console.log('Server closed');
});

server.listen(4001);

//1. Instantiate the server and log some important events (errors and server.close)
//2. server.on('connection', etc) to pick up new connections and return data
//3. Set up sockets array to store all connections centrally
//4. Broadcast the data to all users
