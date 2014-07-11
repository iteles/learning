var Hapi = require('hapi');
var path = require('path');

var options = {
    views: {
        //provides the path and the engine to read the html template file that will be output by server
        path: path.join(__dirname + '/templates'),
        engines: {
            html: require('handlebars')
          },
        //provides path to helper function used within the template to perform transformation
        //this means that when {{helper}} is used in the template file, it knows where to pull the helper function from
        helpersPath: path.join(__dirname + '/helpers')
    }
};

var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080), options);

server.route({
  method:'GET',
  path:'/',
  handler: {
      //standard HTML template using {{helper}} to pull transformations from the helper.js file
      view: 'template-helpers.html',
    }
});

server.start();

//SOLUTION

// var Hapi = require('hapi');
//     var path = require('path')
//
//
//     var options = {
//         views: {
//             path:  path.join(__dirname, 'templates'),
//             engines: {
//                 html: require('handlebars')
//             },
//             helpersPath:  path.join(__dirname, 'helpers')
//         }
//     };
//
//     var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080), options);
//
//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: {
//             view: 'template.html'
//         }
//     });
//
//     server.start()
