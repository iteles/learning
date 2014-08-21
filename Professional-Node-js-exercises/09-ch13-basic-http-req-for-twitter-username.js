var http = require('http');

var options = {
  host: "www.twitter.com",
  port: 80, //most often used by http
  path: "/klsdjv;iaejwnjtf;gwevandv", //naturally this hard-codes in the username you're looking for but next step is to pull this in from a form
  method: "GET"
};

var request = http.request(options, function(response){
  // if(response.statusCode == 404){
  //   console.log('Username @'+ options.path.slice(1) + ' is available on Twitter');
  // }
  // else{
  //   console.log('Username @'+ options.path.slice(1) + ' not available on Twitter');
  // }
  console.log('STATUS: ', response.statusCode);

});

request.end();
