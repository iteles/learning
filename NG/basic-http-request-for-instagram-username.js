var request = require('request');

var checkAvailability = function(service, username, availability){

    var URL='http://www.instagram.com/';

    request(URL+username, function (error, response, body) {
        if(error){ throw error;}
        if(response.statusCode == 404){
          // console.log(response);
          availability('Yay! @'+ username +' is available on '+service);
        }
        else{
          availability('Sorry, @'+ username +' is already taken on '+service);
      }
    });
  };

exports.checkAvailability = checkAvailability;
