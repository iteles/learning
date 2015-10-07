//Chapter 2, PART 1
//Sets up a server *without* using the `glue`, `rejoice` and `confidence`modules

var Async = require('async');
var Bell = require('bell');
var Blipp = require('blipp');
var Hapi = require('hapi');
var HapiAuthCookie = require('hapi-auth-cookie');
var Hoek = require('hoek');

var Api = require('./api');
var Authentication = require('./authentication');
var Controllers = require('./controllers');
var Models = require('./models');
var Routes = require('./routes')

var internals = {
  //splits out main HTTP server & API server (handles the data)
  servers: {
    http: {
      port: 8080,
      host: '0.0.0.0',
      labels: ['http'] //ensures plugins are loaded to appropriate server connection
    },
    api: {
      port: 8000,
      host: '0.0.0.0',
      labels: ['api']
    }
  },
  options: {
    files: {
      relativeTo: __dirname
    }
  }
};

exports.init = function(callback){
  var server = new Hapi.server();

  server.connection(internals.server.http);
  server.connection(internals.server.api);
  
  //path prefix so we can use relative paths
  server.path(internals.options.files.relativeTo);
  
  //handles errors on requests
  server.on('request-error', function(request, response){
    console.log('request-error: ');
    console.dir(response);
  });
  
  //server routes covered in chapter 3
  server.route({
    method: 'GET',
    path:'/',
    handler: function(req, reply){
      return reply('hello hapi');
    }
  });
  
  //handles registering plugins for the http connection
  var registerHttpPlugins = function(next){
    server.register([
      Bell, 
      Blipp,
      HapiAuthCookie,
      Authentication,
      Controllers, 
      Models,
      Routes
    ],
    { select:'http' },
    function(err){
      return next(err);
    });
  };
  
  //handles registering plugins for the api connection
  var registerApiPlugins = function(next){
    server.register([ 
      Blipp,
      Controllers, 
      Models,
      Api
    ],
    { select:'api' },
    function(err){
      return next(err);
    });
  };
  
  //registers plugins asynchronously (because it doesn't matter which order
  //they are registered in) and starts server
  Async.auto({
    http: registerHttpPlugins,
    api: registerApiPlugins
    },
    function(err, data){
      if(err){
        console.log('server.register err: ');
        return callback(err);
      }
      
      server.start(function (){
        return callback(null, server);
        console.log ('server started');
      });    
        
    });

}; //closes exports.init