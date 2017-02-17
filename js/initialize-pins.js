'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = null;
  var dialogClose = document.querySelector('.dialog__close');
  var activePin = null;

  var APARTMENTS_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = null;

  var updatePins = function () {
    pins = pinMap.querySelectorAll('.pin');
  };

  var clearPins = function () {
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('pin__main')) {
        pinMap.removeChild(pins[i]);
      }
    }
    updatePins();
  };

  var drawSimilarApartments = function (callback) {
    var MAX_SIMILAR = 3;

    if (similarApartments.length > MAX_SIMILAR) {
      similarApartments.splice(MAX_SIMILAR, similarApartments.length - MAX_SIMILAR);
    }
    clearPins();
    similarApartments.forEach(function (item, i) {
      var newPin = window.renderPin(item);
      newPin.setAttribute('data-pin', i);
      pinMap.appendChild(newPin);
    });
    updatePins();

    if (typeof callback === 'function') {
      callback();
    }
  };

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
          window.showCard(
              similarApartments[target.getAttribute('data-pin')],
              callbackShowDialog(target),
              callbackCloseDialog(evt)
            );
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

  var callbackLoadData = function (data) {
    similarApartments = JSON.parse(data);
    drawSimilarApartments(remapTabIndex);
  };

  updatePins();
  window.load(APARTMENTS_DATA, callbackLoadData);
  pinMap.addEventListener('click', selectPinHandler);
  pinMap.addEventListener('keydown', selectPinHandler);
})();
