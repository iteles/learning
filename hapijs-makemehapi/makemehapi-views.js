var Hapi = require('hapi');
var path = require('path');

//create options object which will be passed to createServer to define the templating engine and path
 var options = {
        views: {
        	//path.join is necessary for it to recognise that we are in the current directory (__dirname) +/templates
            path: path.join(__dirname + '/templates'),
            engines: {
                html: require('handlebars')
            }
        }
    };

//createServer takes an options object as the 3rd parameter to define templating engine and path
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080), options);

server.route({
    method: 'GET',   
    path: '/',  //?name= will be added after the home URL when this is run to send through the parameters to be used in the view template
    handler: {

        view: "template-views.html"
        //already knows that this is in the templates folder and that it will be read using handlebars due to the options
        //object provided to the server
    }
});

server.start();

//Exercise instructions state we must respond to requests to '/?name=Handling', therefore query.name is used in the template
//as opposed to a different parameter name to ensure that it captures whatever is provided in the '/?name=' URL

//SOLUTION

    // var Hapi = require('hapi');
    // var path = require('path');
    
    // var options = {
    //     views: {
    //         path: path.join(__dirname + '/templates'),
    //         engines: {
    //             html: require('handlebars')
    //         }
    //     }
    // };
    
    // var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080), options);
    
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: {
    //         view: 'template.html'
    //     }
    // });
    
    // server.start()