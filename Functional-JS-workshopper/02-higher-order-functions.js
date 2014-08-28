//JavaScript has 'first class functions', which means functions can be treated just like any other
//value and can be stored as variables,properties or objects and passed to functions as arguments.

function repeat(operation, num) {
  for(i=0; i<num; i++){
    operation();
  }
}

module.exports = repeat;


// ***** OFFICIAL SOLUTION *****
  // function repeat(operation, num) {
  //   if (num <= 0) return
  //   operation()
  //   return repeat(operation, --num)
  // }
  //
  // module.exports = repeat
