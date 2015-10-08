//Again, this code cannot be run as chapter 3 doesn't take us
//through connecting the routes to the rest of the code
var Joi = require('joi'); 
var internals = {};

routes = [
  {
    method: 'GET',
    path: '/plugins/{name}',
    config: internals.config
  }
  
  //uploading a file from upload.html template
  { 
    method: 'GET',
    path: '/plugins/upload',
    config: Controllers.Plugin.getUpload
  },
  { 
    method: 'POST', 
    path: '/plugins/upload',
    config: Controllers.Plugin.postUpload
  },
  
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