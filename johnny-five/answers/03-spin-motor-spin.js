var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
  var motor = new five.Motor(9);

  motor.on('start', function(){
    board.wait(2000, function(){
      motor.stop();
    });
  });

  motor.on('stop', function(){
    board.wait(1000, function(){
      motor.start(200);
    });
  });

  //not sure why this only works here and not if I put
  //it up top after the motor variable is initialised
  motor.start(200);

});
