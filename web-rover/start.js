// Central entry point

var log = require('./lib/log');
var events = require('./lib/events');
var board = require('./lib/board');
var webserver = require('./lib/webserver');

events.on('boardReady', function () {
  log.info('Board ready!');
});

events.on('webserverReady', function () {
  log.info('Webserver ready!');
});
