'use strict';

window.showCard = (function () {
  var tokyo = document.querySelector('.tokyo');
  var dialogWindow = tokyo.querySelector('.dialog');

  var onShowDialog = null;
  var onCloseDialog = null;

  var closeDialog = function () {
    dialogWindow.classList.add('invisible');
    dialogWindow.removeEventListener('click', closeDialogHandler);
    dialogWindow.removeEventListener('keydown', closeDialogHandler);
    tokyo.removeEventListener('keydown', tokyoPressESC);
    if (typeof onCloseDialog === 'function') {
      onCloseDialog();
    }
  };

  var showDialog = function () {
    dialogWindow.classList.remove('invisible');
    dialogWindow.addEventListener('click', closeDialogHandler);
    dialogWindow.addEventListener('keydown', closeDialogHandler);
    tokyo.addEventListener('keydown', tokyoPressESC);
    if (typeof onShowDialog === 'function') {
      onShowDialog();
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

  return function (callbackShow, callbackClose) {
    onShowDialog = callbackShow;
    onCloseDialog = callbackClose;
    showDialog();
  };
})();
