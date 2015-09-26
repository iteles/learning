var Lab = require('lab');
//test files must now export a test script
//https://github.com/hapijs/lab#usage
var lab = exports.lab = Lab.script();
var Code = require('code'); //lab now forces you to require your assertion library rather than having one built in
 
var server = require("../index.js");

lab.experiment("Basic HTTP Tests", function(){
  
  lab.test("GET /{yourname*} (endpoint test)", function(done){
    var options = {
      method: 'GET',
      url: '/Timmy'
    };
    
    //server inject simulates an http request
    server.inject(options, function(response){
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result).to.have.length(12); //"Hello Timmy!"
      done();
    });    
  });
  
});

lab.experiment("Authentication required to view photo", function(){
  
  lab.test("Deny user viewing rights if unauthenticated /photo/{id*}", function(done){
    var options = {
      method: 'GET',
      url: "/photo/8795"
    }
    
    server.inject(options, function(response){
      Code.expect(response.statusCode).to.equal(401);
      Code.expect(response.result.message).to.equal("Please log-in to see that");
      done();
    })  
  });
  
});
