'use strict';

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = document.querySelectorAll('.pin');

var dialogWindow = document.querySelector('.dialog');

var noticeTitle = document.querySelector('#title');
var noticePrice = document.querySelector('#price');
var noticeAddress = document.querySelector('#address');
var noticeTime = document.querySelector('#time');
var noticeTimeout = document.querySelector('#timeout');
var noticeType = document.querySelector('#type');
var noticeRooms = document.querySelector('#room_number');
var noticeCapacity = document.querySelector('#capacity');

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
  dialogWindow.removeEventListener('keydown', keydownDialogHandler);
  pinMap.removeEventListener('keydown', keydownDialogHandler);
};

var showDialog = function () {
  dialogWindow.classList.remove('invisible');

  dialogWindow.addEventListener('click', closeDialogHandler);
  dialogWindow.addEventListener('keydown', keydownDialogHandler);
  pinMap.addEventListener('keydown', keydownDialogHandler);
};

var selectPin = function (pin) {
  deactivatePins();
  pin.classList.add('pin--active');
  pin.setAttribute('aria-pressed', 'true');
  showDialog();
};

var selectPinHandler = function (evt) {
  var target = evt.target;

  while (target !== pinMap) {
    if (target.classList.contains('pin')) {
      selectPin(target);
    }
    target = target.parentNode;
  }
};

var isPressENTER = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

var isPressESC = function (evt) {
  return evt.keyCode && evt.keyCode === ESC_KEY_CODE;
};

var keydownMapHandler = function (evt) {
  if (isPressENTER(evt)) {
    selectPinHandler(evt);
  }
};

var closeDialogHandler = function (evt) {
  var target = evt.target;

  while (target !== dialogWindow) {
    if (target.classList.contains('dialog__close')) {
      evt.preventDefault();
      closeDialog();
    }
    target = target.parentNode;
  }
};

var keydownDialogHandler = function (evt) {
  if (isPressESC(evt)) {
    closeDialog();
  }
};

var validationForm = function () {
  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;

  noticePrice.required = true;
  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;

  noticeAddress.required = true;
};

var changeTime = function () {
  noticeTimeout.value = noticeTime.value;
};

var changeTimeout = function () {
  noticeTime.value = noticeTimeout.value;
};

var changeType = function () {
  noticePrice.min = noticeType.value;
  noticePrice.value = noticeType.value;
};

var changeRoom = function () {
  if (noticeRooms.value === '1') {
    noticeCapacity.value = '0';
  } else {
    noticeCapacity.value = '3';
  }
};

pinMap.addEventListener('click', selectPinHandler);
pinMap.addEventListener('keydown', keydownMapHandler);
validationForm();
noticeTime.addEventListener('change', changeTime);
noticeTimeout.addEventListener('change', changeTimeout);
noticeType.addEventListener('change', changeType);
noticeRooms.addEventListener('change', changeRoom);

changeType();
changeRoom();
