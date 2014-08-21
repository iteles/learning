//first step of http request for IG username availability, using request module
var request = require('request');

request('http://www.instagram.com/ajkjhdiuy', function (error, response, body) {
    if(error){ throw error;}
    if(response.statusCode == 404){
    console.log('Yay! That username is available on Instagram.');
    }
    else{
    console.log('Sorry, that username is already taken on Instagram.');
  }
});
