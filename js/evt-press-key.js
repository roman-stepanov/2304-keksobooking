'use strict';

window.evtPressKey = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var isPressKey = function (evt, keyCode) {
    return evt.keyCode && evt.keyCode === keyCode;
  };

  var isPressENTER = function (evt) {
    return isPressKey(evt, ENTER_KEY_CODE);
  };

  var isPressESC = function (evt) {
    return isPressKey(evt, ESC_KEY_CODE);
  };

  return {
    isPressENTER: isPressENTER,
    isPressESC: isPressESC
  };
})();
