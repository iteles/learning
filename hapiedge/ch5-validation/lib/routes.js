//Route doesn't work yet as this chapter oddly doesn't show how to connection
//this code back to index.js
var Joi = require('joi'); //added this line to make it run
var internals = {};

//I think I made this variable up, look back at ch3 to find out what it should be and ammend comment at the top, maybe just server.route?
var routes = [
  {
    method: 'GET',
    path: '/plugins/{name}',
    config: internals.config
  }
  // Assets & Static Routes
  { method: 'GET',  path: '/favicon.ico', handler: Controllers.Static.favicon },
  { method: 'GET',  path: '/css/{path*}', handler: Controllers.Static.css },
  { method: 'GET',  path: '/img/{path*}', handler: Controllers.Static.img },
  { method: 'GET',  path: '/js/{path*}', handler: Controllers.Static.js }
];

internals.config = {
  description: 'A path to get info for a specific plugin',
  validate: {
    params: { name: Joi.string().required() }
  },
  handler: function (request, reply) {
    var message = 'The name of the plugin that was passed is';
    return reply(message + request.params.name);
  }
};

module.exports = routes; //added this line to make it run