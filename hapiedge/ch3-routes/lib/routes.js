//Route doesn't work yet as this chapter oddly doesn't show how to connection
//this code back to index.js
var Joi = require('joi'); //added this line to make it run
var internals = {};

var routes = [
  {
    method: 'GET',
    path: '/plugins/{name}',
    config: internals.config
  }
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