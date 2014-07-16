//require 'net'because we're building a TCP server in this chapter, not 'http' for example

var server = require('net').createServer(function(socket){
	console.log('A new connection has been created');

	socket.setEncoding('utf8');
	socket.write("Hello! Welcome to the command line.");
	socket.end();
	console.log('Client connection has now ended');
	server.close(); //closes server
}).listen(4001); //remember that the first line where var server is created doesn't actually end until here!
//to try this out, launch the server from the command line & then establish a new connection to it (typing 'telnet localhost 4001' also into the command line)
