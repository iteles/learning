//first step of http request for IG username availability, using request module
var B = {};
var request = require('request');

// var username = 'lauvjlakdnf';
// var service = 'http://www.instagram.com/';

B.checkAvailability = function(service, username){

  request(service+username, function (error, response, body) {
      if(error){ throw error;}
      if(response.statusCode == 404){
        return 'Yay! That username is available on Instagram.';
      }
      else{
        return 'Sorry, that username is already taken on Instagram.';
    }
  });
};

module.exports = B;



// var url = 'http://www.instagram.com/lauvjlakdnf';
//
// request(url, function (error, response, body) {
//     if(error){ throw error;}
//     if(response.statusCode == 404){
//     console.log('Yay! That username is available on Instagram.');
//     }
//     else{
//     console.log('Sorry, that username is already taken on Instagram.');
//   }
// });
