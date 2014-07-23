var Path = require('path');
var Hapi = require('hapi');

var serverOptions = {
    views: {
        engines: {
            //note that this is no longer the simple 'html: require('handlebars')' but can now contain more information
            'html':{

              //set handlebars as responsible for handling views of html files
              module: require('handlebars'),

              //The signature of the compile method for synchronous engines is function (template, options)
              //and that method should return a function with the signature function (context, options) which
              //should either throw an error, or return the compiled html.
              //compileMode defaults to sync, to use an asynchronous engine you must set compileMode to async.
              compileMode: 'sync', // engine specific
              //compileOptions is the object passed as the second parameter to compile,
              //while runtimeOptions is passed to the method that compile returns.

              isCached: 'false' //MAKE SURE THIS IS TRUE IN PRODUCTION, useful that the templates are not cached in development
            }
        },

        //by default, hapi will look for templates in current directory so another can be specified here if required
        basePath: __dirname,
        //the following feed off the basePath
        path: './views', //this is the templates directory
        layoutPath: './views/layout',
        helpersPath: './views/helpers'
    } //end of views
};

var server = new Hapi.Server(3000, serverOptions);

server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: {
          template: 'index.html',
          //this passes context directly to a view, however, if there's a global context that
          //should be always be available on ALL templates, you can set it using Hoek's onPreResponse
          //handler on the server. More information: http://hapijs.com/tutorials/views
          context: {
              title: 'My home page'
          }
      }

      //alternatively use: reply.view('index.html', ['My home page'])

    } //end of handler
});

server.start();
