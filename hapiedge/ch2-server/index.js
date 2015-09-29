//Chapter 2, PART 2 
//Sets up a server using the `glue`, `rejoice` and `confidence`modules

var Glue = require('glue'); 
var Hapi = require('hapi');

var internals = {
  manifest: {
    
    //server connections including labels for each one
    connection: [{
        port: 8080,
        labels: ['http']
      },
      {
        port: 8000,
        labels: ['api']
      }],
    
    //defines all the plugins and the correct connection for each one
    plugins:{
      bell: [{ 'select': ['http']}],
      blipp: [{}],
      
      './authentication' : [{ 'select' : ['http'] }],
      './controllers' : [{ 'select' : ['http', 'api'] }],
      
      '/models' : [{ 'select' : ['http' , 'api'] }],
      './routes' : [{ 'select' : ['http'] }],
      './api' : [{ 'select' :['api'] }],
      
      good: {
        opsInterval: 5000,
        reporters: [{
          'reporter' : 'good-console',
          'events' : {'ops':'*', 'log':'*'}
        }]
      }
    } // closes plugins
  } // closes manifest
}; //end of internals

//brings everything together, compose(manifest, [options], callback)
Glue.compose(internals.manifest, { relativeTo: __dirname },
  function(err, server){
  
  if (err){
    console.log('server.register err: ', err);
  }
  
  server.start(function(){
    console.log('server started');
  });
  
});
