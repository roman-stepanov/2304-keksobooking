'use strict';

window.renderPin = (function () {
  var templatePin = document.querySelector('#pin-template');
  var pinToClone = templatePin.content.querySelector('.pin');

  return function (dataPin) {
    var newPin = pinToClone.cloneNode(true);
    var avatar = newPin.querySelector('img');

    avatar.setAttribute('src', dataPin.author.avatar);
    avatar.setAttribute('alt', 'User Avatar');
    newPin.style.left = dataPin.location.x + 'px';
    newPin.style.top = dataPin.location.y + 'px';

    return newPin;
  };
})();
