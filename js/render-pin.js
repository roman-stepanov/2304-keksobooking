'use strict';

window.renderPin = (function () {
  var templatePin = document.querySelector('#pin-template');
  var clonePin = templatePin.content.querySelector('.pin');
  var avatarPin = clonePin.querySelector('img');

  avatarPin.setAttribute('src', 'img/avatars/default.png');
  avatarPin.setAttribute('alt', 'User Avatar');

  return function (dataPin) {
    var newPin = clonePin.cloneNode(true);

    newPin.style.left = dataPin.location.x + 'px';
    newPin.style.top = dataPin.location.y + 'px';

    return newPin;
  };
})();
