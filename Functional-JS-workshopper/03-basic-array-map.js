//The map() method creates a new array with the results of calling a provided function on every element in this array.

function doubleAll(numbers) {

  return numbers.map(function(n){
      return n*2;
  });
}


module.exports = doubleAll;

// ***** OFFICIAL SOLUTION *****
 // module.exports = function doubleAll(numbers) {
 //    return numbers.map(function double(num) {
 //      return num * 2
 //    })
 //  }
