var Hapi = require("hapi");

//creates a server variable which is set to listen on port 8080
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));


//routing allows the server to react differently based on the HTTP path requested and method used
server.route({
	//this takes the name from the URL e.g. http://localhost:8080/John
	path: "/{name*}",
	method: "GET", 
	//handler determines the action to take when the request matches the route
	handler: function(request, reply){
		//splits at the '/', e.g. in http://localhost:8080/John/Smith, name[0]=John and name[1]=Smith
		var name = request.params.name.split('/');
		reply("Hello "+ name[0]);
	}
});

//start() is a method of hapi.Server and makes the server listen on the port & host specified when it was created
server.start();


//SOLUTION
	    // var Hapi = require('hapi');
	    // var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));
	    // server.route({
	    //     method: 'GET',
	    //     path: '/{name}',
	    //     handler: function (request, reply) {
	    //         reply('Hello ' + request.params.name);
	    //     }
	    // });
	    // server.start();