var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
  //photoresistor attached to pin A0
  var sensor = new five.Sensor("A0");
  var led = new five.Led(9);

  sensor.within([600, 2000], function(){
    led.on();
  });

  sensor.within([0, 599], function(){
    led.off();
  });
});

// ******************
// SOLUTION
// ******************
//
//     var five = require('johnny-five')
//     var board = new five.Board()
//
//     board.on('ready', function () {
//       var led = new five.Led(9)
//       var pr = new five.Sensor('A0')
//
//       pr.on('change', function () {
//         if (this.value > 600) {
//           led.on()
//         } else {
//           led.off()
//         }
//       })
//     })
//
