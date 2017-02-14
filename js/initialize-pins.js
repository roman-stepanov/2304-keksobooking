'use strict';

(function () {

  // var tokyo = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin');
  // var dialogWindow = tokyo.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var activePin = null;

  var activatePin = function () {
    activePin.classList.add('pin--active');
    activePin.setAttribute('aria-pressed', 'true');
  };

  var deactivatePin = function () {
    activePin.classList.remove('pin--active');
    activePin.setAttribute('aria-pressed', 'false');
  };

  var focusPin = function (evt) {
    if (evt.type === 'keydown') {
      activePin.focus();
    }
  };

  var callbackShowDialog = function (selectedPin) {
    return function () {
      if (activePin) {
        deactivatePin();
      }
      activePin = selectedPin;
      activatePin();
    };
  };

  var callbackCloseDialog = function (evt) {
    return function () {
      deactivatePin();
      focusPin(evt);
    };
  };

  var selectPinHandler = function (evt) {
    var target = evt.target;

    if (evt.type === 'click' || window.evtPressKey.isPressENTER(evt)) {
      while (target !== pinMap) {
        if (target.classList.contains('pin')) {
          window.showCard(callbackShowDialog(target), callbackCloseDialog(evt));
          break;
        }
        target = target.parentNode;
      }
    }
  };

  var getPinOffsetX = function (pin) {
    return parseInt(getComputedStyle(pin).left, 10);
  };

  var comparePinX = function (a, b) {
    return getPinOffsetX(a) - getPinOffsetX(b);
  };

  var remapTabIndex = function () {
    var tabindex = 1;
    var sortPins = [].slice.call(pins);

    dialogClose.setAttribute('tabindex', tabindex);

    sortPins.sort(comparePinX);
    for (var i = 0; i < pins.length; i++) {
      sortPins[i].setAttribute('tabindex', ++tabindex);
    }
  };

  remapTabIndex();
  pinMap.addEventListener('click', selectPinHandler);
  pinMap.addEventListener('keydown', selectPinHandler);
})();
