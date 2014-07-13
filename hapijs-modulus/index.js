var Hapi = require('hapi');
var routes = require(__dirname +'/quotes-routes.js')

//moved the small array of initial data (quotes[]) to the routes file


var server = Hapi.createServer('localhost', 8080);


server.route(routes);


server.start();
