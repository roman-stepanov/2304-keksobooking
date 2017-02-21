'use strict';

window.showCard = (function () {
  var tokyo = document.querySelector('.tokyo');
  var templateDialog = document.querySelector('#dialog-template');
  var cloneDialog = templateDialog.content.querySelector('.dialog');
  var dialogWindow = cloneDialog.cloneNode(true);

  var authorAvatar = dialogWindow.querySelector('.dialog__title img');
  var offerTitle = dialogWindow.querySelector('.lodge__title');
  var offerAddress = dialogWindow.querySelector('.lodge__address');
  var offerPrice = dialogWindow.querySelector('.lodge__price');
  var offerType = dialogWindow.querySelector('.lodge__type');
  var offerRoomsAndGuests = dialogWindow.querySelector('.lodge__rooms-and-guests');
  var offerCheckinTime = dialogWindow.querySelector('.lodge__checkin-time');
  var offerFeatures = dialogWindow.querySelector('.lodge__features');
  var offerDescription = dialogWindow.querySelector('.lodge__description');
  var offerPhotos = dialogWindow.querySelector('.lodge__photos');

  var onShowDialog = null;
  var onCloseDialog = null;

  var closeDialog = function () {
    dialogWindow.removeEventListener('click', closeDialogHandler);
    dialogWindow.removeEventListener('keydown', closeDialogHandler);
    document.removeEventListener('keydown', pressESCHandler);
    tokyo.removeChild(dialogWindow);
    if (typeof onCloseDialog === 'function') {
      onCloseDialog();
    }
  };

  var showDialog = function () {
    dialogWindow.addEventListener('click', closeDialogHandler);
    dialogWindow.addEventListener('keydown', closeDialogHandler);
    document.addEventListener('keydown', pressESCHandler);
    tokyo.appendChild(dialogWindow);
    if (typeof onShowDialog === 'function') {
      onShowDialog();
    }
  };

  var fillListFeatures = function (data) {
    var listFeatures = data.offer.features;

    offerFeatures.innerHTML = '';
    listFeatures.forEach(function (item, i) {
      var featureElement = document.createElement('span');

      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + item);
      offerFeatures.appendChild(featureElement);
    });
  };

  var fillPhotos = function (data) {
    var photos = data.offer.photos;

    offerPhotos.innerHTML = '';
    photos.forEach(function (item) {
      var img = document.createElement('img');

      img.setAttribute('src', item);
      img.setAttribute('width', '52');
      img.setAttribute('height', '42');
      img.setAttribute('alt', 'Lodge photo');
      offerPhotos.appendChild(img);
    });
  };

  var fillDialog = function (data) {
    var typesApartments = {
      'flat': 'Квартира',
      'house': 'Дворец',
      'bungalo': 'Лачуга'
    };

    authorAvatar.setAttribute('src', data.author.avatar);
    offerTitle.innerText = data.offer.title;
    offerAddress.innerText = data.offer.address;
    offerPrice.innerText = data.offer.price + ' ₽/ночь';
    offerType.innerText = typesApartments[data.offer.type];
    offerRoomsAndGuests.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    offerCheckinTime.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    fillListFeatures(data);
    offerDescription.innerText = data.offer.description;
    fillPhotos(data);
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

  var pressESCHandler = function (evt) {
    if (window.evtPressKey.isPressESC(evt)) {
      closeDialog();
    }
  };

  return function (dataPin, callbackShow, callbackClose) {
    onShowDialog = callbackShow;
    onCloseDialog = callbackClose;
    fillDialog(dataPin);
    showDialog();
  };
})();
