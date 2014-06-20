var server = require('net').createServer(); //creating the server

var port = 4001; //establishing the port number, which you will bind to the server later on

server.on('listening', function(){
	console.log('Server is listening on port ', port);
});

server.on('connection', function(socket){ //when a new connection is established to the server, a new socket object is handed to you
	console.log('Server has a new connection'); 
	socket.end(); //end the new connectsion
	server.close(); //close the server & consequently unbind it from the port
});

server.on('close', function(){
	console.log('Server is now closed');
});

server.on('error', function(err){
	console.log('An error occurred: ', err.message);
});

server.listen(port); //binding the server to port 4001 in this case

//to try this out, launch the server from the command line(node 04-ch10-TCP-server-lifecycle.js)
//and then establish a new connection to it, also from the command line (telnet localhost 4001)
//it should immediately close the new connection (because you told it to on line 11) and close the server
