// Simple motor class
var log = require('./log');

function RoverMotor (position, motor) {
  log.debug('RoverMotor: Creating motor ' + position);
  this.position = position;
  this.motor = motor;

  // Our `stop` method serves as a nice reset
  this.stop();
}

RoverMotor.prototype.start = function (startY) {
  log.debug('RoverMotor: Starting motor ' + this.position);
  this.startY = startY;
};

RoverMotor.prototype.move = function (clientY) {
  log.debug('RoverMotor: Moving motor ' + this.position);

  // Determine speed / direction
  this.speed = Math.abs(clientY - this.startY);
  if (this.speed > 255) { this.speed = 255; }
  this.direction = (clientY < this.startY) ? 'fwd' : 'rev';
  log.debug('Motor speed / dir: ', this.speed, this.direction);

  // Make it happen
  this.motor.speed(this.speed);
  this.motor[this.direction]();
};

RoverMotor.prototype.stop = function () {
  log.debug('RoverMotor: Stopping motor ' + this.position);

  // Clear some stuff
  this.startY = null;
  this.speed = 0;
  this.direction = 'fwd';

debugger;
  this.motor.stop();
}

module.exports = RoverMotor;
