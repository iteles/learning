var data = [
  {age: 15},
  {age: 2},
  {age: 36},
  {age: 86},
];

//array additions

//map
var ages = data.map(function(d) {
  return d.age;
});
console.log(ages);

//next generation of js, could be written like:
//var ages = data.map(d) => d.age;

//filter
var evenAges = ages.filter(isEven); //note in JS you can use functions before you declare them
  console.log(evenAges);

function isEven(d){
  return d % 2 ===0;
}
//sidenote: variable hoisting - JS hoists the variables to the top of the function, so you can refer to the variable before it's defined (but it'll return undefined)

//some
var someAreEven = ages.some(isEven);
var allAreEven = ages.every(isEven);
console.log("some", someAReEven, "all", allAreEven);

//take and array, take a functiona and return a new value
//reduce
//often used in - doing two things at once, filter and sum up and array - if you use map, you only have to iterate over the array once (without falling back to a for loop)
var sum = ages.reduce(add);
console.log(sum);

function add(a,b){ return a+b;}

var sum = ages.reduce(function(memo, member){
  return memo + member;
}, 0);
console.log(sum);

//concat takes 2 arrays and puts them together
//unshift adds one item to the beginning of the array
//push adds one item to the end
