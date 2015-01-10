var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
  var button = new five.Button(5);
  var led = new five.Led(9);

  button.on('press', function(){
    //toggle on and off
    led.toggle();
  });
});
