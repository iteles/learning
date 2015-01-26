//pull in any libraries you need, in this case just the 'expect' from chai
var expect = require('chai').expect;
//pull in the file you'll be testing
var tags = require('../lib/tags.js');

describe('Tags', function(){
  //we are testing the parse function
  describe('parse()', function(){
    //we are testing the parse function works correctly with long form tags
    it('should parse long form tags', function(){
      var args = ('--depth=2', '--hello=world');
      var results = tags.parse(args);

      //expect results to have a property depth of 4
      expect(results).to.have.a.property('depth', 4);
      expect(results).to.have.a.property('hello', 'world');
    });
  });
});
