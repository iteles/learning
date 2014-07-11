var Hapi = require("hapi");

//creates a server variable which is set to listen on port 8080
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));


//routing allows the server to react differently based on the HTTP path requested and method used
server.route({
	path: "/",
	method: "GET", 
	//handler determines the action to take when the request matches the route
	handler: function(request, reply){
		reply("Hello Hapi");
	reply({mustFlow:true});
	}
});

//start() is a method of hapi.Server and makes the server listen on the port & host specified when it was created
//can also take a function that will be executed when the server has started listening for requests
server.start();
