//writing a simple request to the testing server
var request = require('request');
var inspect = require('util').inspect;

request('http://localhost:4001/abc/def',
  function(err, response, body){
      if (err) {throw err; }
      console.log(inspect({
          err:err, //will print out 'err:' followed by error
          response: {
            statusCode: response.statusCode
          },
          body: JSON.parse(body) //prints headers because nothing is being written to the request stream so it assumes body has length of zero
      })); //end of console.log inspect
  } //end of function
); //end of request
