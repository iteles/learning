var jfive = require('johnny-five');

var board = new jfive.Board();
board.on('ready', function(){
  //led attached to pin 13
  var led = new jfive.Led(13);
  //strobe once every second
  led.strobe(1000);
});
