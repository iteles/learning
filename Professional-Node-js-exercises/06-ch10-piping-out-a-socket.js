//this will add everything you write to the command line into a file stipulated in /path/to/file when the writeStream is created

//creates the writeStream which will contain the data entered by the user
var ws = require('fs').createWriteStream('./textFromSocket-chapter10.txt');

var server = require('net').createServer(function(socket) { //creates the TCP server

//will be console logged when a new connection is established with the server (e.g. using 'telnet localhost 4001')
	console.log('New connection established');

	socket.setEncoding('utf8');

	socket.write("Hi! Please go ahead and type whatever you want to go into the textFromSocket file. Type 'quit' to exit.\n");

	socket.on('data', function(data){ //every time data is received, this loop will be initiated
		if(data.trim().toLowerCase() === 'quit'){ //if the user writes quit, we end the socket
			socket.write('Thanks for coming!');
			return socket.end();
		}
	});

	// socket.pipe(ws); //takes what is typed into the command line and pipes it into the file, just like a regular readStream
	socket.pipe(ws);

	socket.on('end', function() {
	console.log('Client connection ended');
});

}).listen(4001);

//again, to try this out, run it in node and then establish a new connection to this server by
// typing 'telnet localhost 4001'
