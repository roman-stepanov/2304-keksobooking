'use strict';

(function () {

  var tokyo = document.querySelector('.tokyo');
  var pinMap = tokyo.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin');
  var dialogWindow = tokyo.querySelector('.dialog');
  var dialogClose = dialogWindow.querySelector('.dialog__close');

  var deactivatePins = function () {
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
      pins[i].setAttribute('aria-pressed', 'false');
    }
  };

  var closeDialog = function () {
    dialogWindow.classList.add('invisible');
    deactivatePins();

    dialogWindow.removeEventListener('click', closeDialogHandler);
    dialogWindow.removeEventListener('keydown', closeDialogHandler);
    tokyo.removeEventListener('keydown', tokyoPressESC);
  };

  var showDialog = function () {
    dialogWindow.classList.remove('invisible');

    dialogWindow.addEventListener('click', closeDialogHandler);
    dialogWindow.addEventListener('keydown', closeDialogHandler);
    tokyo.addEventListener('keydown', tokyoPressESC);
  };

  var selectPin = function (pin) {
    deactivatePins();
    pin.classList.add('pin--active');
    pin.setAttribute('aria-pressed', 'true');
    showDialog();
  };

  var selectPinHandler = function (evt) {
    var target = evt.target;

    if (evt.type === 'click' || window.evtPressKey.isPressENTER(evt)) {
      while (target !== pinMap) {
        if (target.classList.contains('pin')) {
          selectPin(target);
          break;
        }
        target = target.parentNode;
      }
    }
  };

  var closeDialogHandler = function (evt) {
    var target = evt.target;

    if (evt.type === 'click' || window.evtPressKey.isPressENTER(evt)) {
      while (target !== dialogWindow) {
        if (target.classList.contains('dialog__close')) {
          evt.preventDefault();
          closeDialog();
          break;
        }
        target = target.parentNode;
      }
    }
  };

  var tokyoPressESC = function (evt) {
    if (!dialogWindow.classList.contains('invisible') && window.evtPressKey.isPressESC(evt)) {
      closeDialog();
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
