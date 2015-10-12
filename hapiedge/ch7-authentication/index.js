var Glue = require('glue'); 
var Hapi = require('hapi');

var internals = {
  manifest: {
    connections: [{
        port: 8080,
        labels: ['http']
      },
      {
        port: 8000,
        labels: ['api']
      }],
    
    plugins:{
      bell: [{ 'select': ['http']}],
      blipp: [{}],
      
      './authentication' : [{ 'select' : ['http'] }],
      './controllers' : [{ 'select' : ['http', 'api'] }],
      
      '/models' : [{ 'select' : ['http' , 'api'] }],
      './lib/routes' : [{ 'select' : ['http'] }], //added this line to make it run
      './api' : [{ 'select' :['api'] }],
      
      good: {
        opsInterval: 5000,
        reporters: [
          { 'reporter' : 'good-console', 'events' : {'ops':'*', 'log':'*'} }
        ]
      }
    } 
  } 
}; 

Glue.compose(internals.manifest, { relativeTo: __dirname },
  function(err, server){
  
  if (err){
    console.log('server.register err: ', err);
  }
  
  server.start(function(){
    console.log('server started');
  });
  
});
