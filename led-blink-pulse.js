var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(11);
  led.off();

  var delta = 100;
  var duration = 500;
  var min = 100;
  var max = 500;

  function toggleAndTweak () {
    led.toggle();

    setTimeout(toggleAndTweak, duration);

    duration += delta;
    if (duration > max) {
      duration = max;
      delta = -delta;
    } else if (duration < min) {
      duration = min;
      delta = -delta;
    }
  }

  toggleAndTweak();
});
