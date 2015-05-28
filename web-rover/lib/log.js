// A simple logger with colors

// Set up colors module
var colors = require('colors');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// Create a plain logger
function log () {
  console.log.apply(console, arguments);
}

// Self-refs! Woo!
log.log = log;

// For colored output, set up a few things
[
  'debug',
  'info',
  'warn',
  'error'
].forEach(function (method) {
  log[method] = function () {
    var message = colors[method].apply(colors, arguments);
    console.log(message);
  }
});

module.exports = log;
