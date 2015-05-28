var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var temp = new five.Temperature({
    controller: "TMP36",
    pin: "A0"
  });

  var rgb = new five.Led.RGB({
    pins: [6, 5, 3],
    isAnode: true
  });

  rgb.stop().off();

  temp.on("change", function() {
    // Write an algorithm that converts temperature (F, K or C)
    // into an RGB hex value.
    //rgb.color(??????);
    var degrees = this.fahrenheit;

    if (degrees >= 80) {
      rgb.color('#ff0000');
    } else if (degrees < 77) {
      rgb.color('#0000ff');
    } else {
      rgb.color('#cccccc');
    }

    console.log('Temp: ' + this.fahrenheit);
  });
});
