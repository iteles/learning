var Hapi = require('hapi');
var routes = require('./routes.js');

var options = { };
//If you plan to deploy your Hapi application to a PaaS provider, you must listen on host 0.0.0.0 rather than localhost or 127.0.0.1
var server = new Hapi.Server('0.0.0.0', 8080, options);

//registering the lout plugin which enable the documentation generator - this in turn lists all available endpoints and their requirements
server.pack.register({
    plugin: require('lout'),
    options: {
        endpoint: '/docs'
    }
 }, function (err) {

     if (err) {
         console.log('Failed loading plugin');
     }
 });

 
//rather than adding a single route here through server.route(), we are storing an array of routes elsewhere and then pulling them in here
server.route(routes);

server.start();


//'localhost', Number(process.argv[2] || 8080
