Following the tutorial at [CodeTuts](http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018) as step 1 in revisiting [TDD](http://agiledata.org/essays/tdd.html) and really nail it.

This instance uses the [Mocha](http://mochajs.org/) test framework and the [Chai](http://chaijs.com/) assertion library to test a simple NodeJS app.

A few notes that might be useful to beginners to TDD:  
* The Chai library includes a number of *chain getters* which don't do anything but serve to make the tests more readable, such as `expect(a + b).to.equal(c)` where `to` is the chain getter - the others are:
  * to
  * be
  * been
  * is
  * that
  * and
  * have
  * with
  * at
  * of
  * same
  * a
  * an
* Basic Mocha syntax is:
```javascript
describe('the component you are testing', function(){
  it('the individual test itself', function(){
    //test code goes here
  });
});
```
