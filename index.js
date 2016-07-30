var Myo = require('myo');
var config = require('./config');

Myo.connect('com.stolksdorf.' + config.appName);

Myo.on('connected', function() {
  console.log('CONNECTED !');
});

var movements = [];
var punching = false;

Myo.on('gyroscope', function() {
  if (movements.length >= config.trackAmount) {
    movements = [];
  }

  movements.push(this.lastIMU.gyroscope);

  var measureAmt = config.measureAmount;

  if (movements.length > measureAmt) {
    var last = movements.slice((movements.length - 1) - measureAmt, movements.length - 1);
    var steps = last.map(function(step) {
      return step.z;
    }).reduce(function(a, b) {
      return b - a;
    }, 0);

    var avgStep = steps / measureAmt;

    if (avgStep > config.punchThreshold && !punching) {
      punching = true;
      console.log('FALCON PUNCH!!!!');

      // wait at least half a second for punch to finish
      setTimeout(function() {
        punching = false;
      }, 500);
    }
  }
});
