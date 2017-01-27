'use strict';

var pins = document.querySelectorAll('.pin');

var dialogWindow = document.querySelector('.dialog');
var dialogClose = dialogWindow.querySelector('.dialog__close');

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
  }
};

var hideDialog = function () {
  dialogWindow.style.display = 'none';
  deactivatePins();
};

var showDialog = function () {
  dialogWindow.style.display = 'block';
};

var selectPin = function (pin) {
  deactivatePins();
  pin.classList.add('pin--active');
  showDialog();
};

var clickPin = function (pin) {
  pin.addEventListener('click', function () {
    selectPin(pin);
  });
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


for (var i = 0; i < pins.length; i++) {
  clickPin(pins[i]);
}
dialogClose.addEventListener('click', hideDialog);
validationForm();
noticeTime.addEventListener('change', changeTime);
noticeTimeout.addEventListener('change', changeTimeout);
noticeType.addEventListener('change', changeType);
noticeRooms.addEventListener('change', changeRoom);

changeType();
changeRoom();
