var exports = module.exports = {};

exports.parse = function(args){
  var options = {};

  //set to defaults if the item doesn't exist in the args array
  if (typeof defaults === "object" && !(defaults instanceof Array)) {
    options = defaults;
  }

  for (var i in args) { //Cycle through args
    var arg = args[i];
    //Check if Long formed tag by checking first 2
    //characters are '--'
    if (arg.substr(0, 2) === "--") {
      console.log('Im inside the if');
      arg = arg.substr(2);
      //if the remaining arg starts with a '='
      if (arg.indexOf("=") !== -1) {
        //splits the string into an array of strings at the '='
        arg = arg.split("=");
        //returns the value at the 0th index and removes it from the array
        var key = arg.shift();
        options[key] = arg.join("=");
      }
    }
  }
  return options;
};
