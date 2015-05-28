// Our board setup

var five = require('johnny-five');
var log = require('./log');
var events = require('./events');

log.warn('Initializing board...');

var board = new five.Board();

board.on("ready", function() {
  log.info('Board ready!');
  events.emit('boardReady');

  var leftMotor = exports.leftMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1);
  var rightMotor = exports.leftMotor = new five.Motor(five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2);

  // Being safe for likely zero reason
  leftMotor.stop();
  rightMotor.stop();

  this.repl.inject(exports);
});

exports.board = board;
