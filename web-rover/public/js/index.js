(function () {
  console.info('index.js starting');

  var emitTouch = function () {
    console.warn('Socket connection not established yet');
  }

  var socket = io(location.href);
  socket.on('connected', function () {
    console.info('Socket connected successfully');

    emitTouch = function (eventType, eventData) {
      var socketData = {
        source: eventData.target.id
      }

      // Don't send touch details when ending
      if (eventType !== 'touchend') {
        socketData.clientX = eventData.originalEvent.touches[0].clientX;
        socketData.clientY = eventData.originalEvent.touches[0].clientY;
      }

      // Send it up
      socket.emit(eventType, socketData);
    }
  });

  $(document).ready(function () {
    var $drivers = $('.driver');
    var $left = $('.driver-left');
    var $both = $('.driver-both');
    var $right = $('.driver-right');

    $drivers.on('touchstart', function (e) {
      console.debug('touchstart', e);

      // Stop scrolling from happening
      e.preventDefault();

      // Send it up
      emitTouch('touchstart', e);
    });

    $drivers.on('touchmove', function (e) {
      console.debug('touchmove', e);

      // Send it up
      emitTouch('touchmove', e);
    });

    $drivers.on('touchend', function (e) {
      console.debug('touchend', e);

      // Send it up
      emitTouch('touchend', e);
    });
  });
})();
