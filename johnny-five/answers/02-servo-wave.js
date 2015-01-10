var jfive = require('johnny-five');

var board = new jfive.Board();

board.on('ready', function(){
  //new servo on pin 9
  var servo = new jfive.Servo(9);

  //sweeps from 0-180
  servo.sweep();

  //board.wait for 3 seconds and then stop and
  //center the servo
  this.wait(3000, function(){
    servo.stop();
    servo.center();
  });
});
