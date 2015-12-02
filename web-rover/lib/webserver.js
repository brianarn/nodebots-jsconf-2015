// The webserver for driving the rover

var Hapi = require('hapi');
var Joi = require('joi');
var log = require('./log');
var events = require('./events');
var board = require('./board');
var RoverMotor = require('./RoverMotor');

var motors = {
  left: null,
  right: null
};

var boardReady = false;

// Bind up some events
events.on('boardReady', function (data) {
  boardReady = true;
  motors = {
    left: new RoverMotor('left', data.motors.left),
    right: new RoverMotor('right', data.motors.right)
  };
});

// Simple function to repeat common actions
function driveMotor(eventType, eventData) {
  // Determine motors to drive
  var motorsToDrive;
  if (eventData.source === 'all') {
    motorsToDrive = [motors.left, motors.right];
  } else {
    motorsToDrive = [motors[eventData.source]];
  }

  motorsToDrive.forEach(function (motor) {
    motor[eventType](eventData.clientY);
  });
}

// Set up our server
log.warn('Starting up the web server');

var server = new Hapi.Server();
server.connection({ port: 3000 });

// Wire in some socket.io
var io = require('socket.io')(server.listener);

io.on('connection', function (socket) {
  log.info('Socket connected');
  socket.emit('connected', true);

  socket.on('touchstart', function (data) {
    var message = [
      'touchstart:',
      ' - source: ' + data.source,
      ' - clientX: ' + data.clientX,
      ' - clientY: ' + data.clientY,
    ].join('\n');
    log.info(message);

    if (!boardReady) {
      log.warn('Board not ready, nothing happening');
      return;
    }

    driveMotor('start', data);
  });

  socket.on('touchmove', function (data) {
    var message = [
      'touchmove:',
      ' - source: ' + data.source,
      ' - clientX: ' + data.clientX,
      ' - clientY: ' + data.clientY,
    ].join('\n');
    log.info(message);

    if (!boardReady) {
      log.warn('Board not ready, nothing happening');
      return;
    }

    driveMotor('move', data);
  });

  socket.on('touchend', function (data) {
    var message = [
      'touchend:',
      ' - source: ' + data.source
    ].join('\n');
    log.info(message);

    if (!boardReady) {
      log.warn('Board not ready, nothing happening');
      return;
    }

    driveMotor('stop', data);
  });
});

// Exposing node modules whee
server.route({
  method: 'GET',
  path: '/vendor/{files*}',
  handler: {
    directory: {
      path: '../node_modules'
    }
  }
});

// Static files route
server.route({
  method: 'GET',
  path: '/{static*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.start(function () {
  log.info('Web Rover server running at %s', server.info.uri);
  events.emit('webserverReady');
});

module.exports = server;
