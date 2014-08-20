var http = require('http');

//need to use a valid myservername.com/upload for this to work - google.com/upload returns a 404
var options = {
  host: "www.google.com",
  port: 80,
  path: "/upload",
  method: "POST"
};

//the callback function passed in as the 2nd argument of http.request() will be invoked
//when there is a response from the server
var request = http.request(options, function(response){
  console.log('STATUS: ', response.statusCode);
  console.log('HEADERS: ', response.headers);

//if the server is available and functioning (not the case with google.com/upload),
// you should get a response object that triggers a response event & the rest of this code
//can be carried out
  response.setEnconding('utf8');

  //the 'chunk' here is the same thing as saying 'data', remember that data is sent in chunks
  response.on('data', function(chunk){
    console.log('BODY: ', chunk);
  });
});

request.write('This is a piece of data. \n');
request.write('And here\'s another. \n');
request.write('This is the last piece of data. \n');

//always remember to have response.end() so the server knows the request is complete and it can reply
request.end();
