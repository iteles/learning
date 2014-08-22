var assert = require('assert');
var checker = require('../basic-http-request-for-instagram-username.js'); //our basic module
// console.dir(B);
describe('Username Availability', function(){
    it('should return 404, username available', function (done) {

        checker.checkAvailability('Instagram','ajkjhdiuy', function check(result) {
          assert.equal(result,'Yay! @ajkjhdiuy is available on Instagram');
          done();
        });

    }); //end of it

  it('should return 200, username not available', function (done) {

      checker.checkAvailability('Instagram','isnteles', function check(result) {
        assert.equal(result,'Sorry, @isnteles is already taken on Instagram');
        done();
      });

  }); //end of it
});
