//https://github.com/nelsonic/learn-hapi
//INTERMEDIATE - Hello World in hapi & Boom error messages section

var Hapi = require('hapi');
var Boom = require('boom');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
	path: '/{yourname*}',
  handler: function(req, reply){
    reply('Hello ' + req.params.yourname + '!');
  }
});

//for section on Boom error messages
server.route({
  method: 'GET',
  path: '/photo/{id*}',
  config: {  
    validate: { params: { id: Joi.string().max(40).min(2).alphanum() } },
    handler: function (req,reply) {
        // until we implement authentication we are simply returning a 401:
        reply(Boom.unauthorized('Please log-in to see that'));
        // the key here is our use of the Boom.unauthorised method.
    }
  }
});

server.start(function(){
  console.log('Now Visit: http://localhost:3000/YOURNAME');
});

module.exports = server;