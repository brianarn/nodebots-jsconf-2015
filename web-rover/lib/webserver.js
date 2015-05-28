// The webserver for driving the rover

var Hapi = require('hapi');
var Joi = require('joi');
var log = require('./log');
var events = require('./events');
debugger;

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
  });

  socket.on('touchend', function (data) {
    var message = [
      'touchend:',
      ' - source: ' + data.source
    ].join('\n');
    log.info(message);
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

exports.server = server;
