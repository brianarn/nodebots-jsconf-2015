function Motor (position, motor) {
  this.position = position;
  this.motor = motor;

  // Our `stop` method serves as a nice reset
  this.stop();
}

Motor.prototype.start = function (startY) {
  this.startY = startY;
};

Motor.prototype.move = function (clientY) {
  // Determine speed / direction
  this.speed = Math.abs(clientY - this.startY);
  this.direction = (clientY < this.startY) ? 'fwd' : 'rev';

  // Make it happen
  this.motor.speed(this.speed);
  this.motor[this.direction]();
};

Motor.prototype.stop = function () {
  // Clear some stuff
  this.startY = null;
  this.speed = 0;
  this.direction = 'fwd';

  this.motor.stop();
}
