//All helper files must export a single method using 'function(context)'
//and returning a string

module.exports = function(context) {

//pick up data from URL responding to /?name=Helping&suffix=!
var foo = this.query.name + this.query.suffix;

return foo;
 }
