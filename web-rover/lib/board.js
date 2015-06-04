// Our board setup

var five = require('johnny-five');
var log = require('./log');
var events = require('./events');

log.warn('Initializing board...');

var board = new five.Board();

board.on("ready", function() {
  log.info('Board ready!');

  var leftMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2);
  var rightMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1);

  // Being safe for likely zero reason
  leftMotor.stop();
  rightMotor.stop();

  // Send out notice of our startup
  events.emit('boardReady', {
    board: board,
    motors: {
      left: leftMotor,
      right: rightMotor
    }
  });

  this.repl.inject(exports);
});

module.exports = board;
