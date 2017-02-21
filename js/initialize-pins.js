'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = null;
  var mainPin = pinMap.querySelector('.pin__main');
  var activePin = null;

  var APARTMENTS_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var apartments = null;
  var similarApartments = null;

  var formFilters = document.querySelector('.tokyo__filters');
  var filterType = formFilters.querySelector('#housing_type');
  var filterPrice = formFilters.querySelector('#housing_price');
  var filterRooms = formFilters.querySelector('#housing_room-number');
  var filterGuests = formFilters.querySelector('#housing_guests-number');
  var filterFeatures = formFilters.querySelector('#housing_features').querySelectorAll('input[type=checkbox]');

  var ANY_VALUE = 'any';
  var MIDDLE_PRICE_VALUE = 'middle';
  var LOW_PRICE_VALUE = 'low';
  var HIGHT_PRICE_VALUE = 'hight';
  var MIN_MIDDLE_PRICE_VALUE = 1000;
  var MAX_MIDDLE_PRICE_VALUE = 1000000;

  var isInRangeType = function (dataApartment) {
    return (filterType.value === ANY_VALUE) || (filterType.value === dataApartment.offer.type);
  };

  var isInRangePrice = function (dataApartment) {
    var result = false;

    switch (filterPrice.value) {
      case MIDDLE_PRICE_VALUE:
        if (dataApartment.offer.price >= MIN_MIDDLE_PRICE_VALUE && dataApartment.offer.price < MAX_MIDDLE_PRICE_VALUE) {
          result = true;
        }
        break;
      case LOW_PRICE_VALUE:
        if (dataApartment.offer.price < MIN_MIDDLE_PRICE_VALUE) {
          result = true;
        }
        break;
      case HIGHT_PRICE_VALUE:
        if (dataApartment.offer.price >= MAX_MIDDLE_PRICE_VALUE) {
          result = true;
        }
    }
    return result;
  };

  var isInRangeRooms = function (dataApartment) {
    return (filterRooms.value === ANY_VALUE) || (dataApartment.offer.rooms === parseInt(filterRooms.value, 10));
  };

  var isInRangeGuests = function (dataApartment) {
    return (filterGuests.value === ANY_VALUE) || (dataApartment.offer.guests === parseInt(filterGuests.value, 10));
  };

  var isInRangeFeatures = function (dataApartment) {

    var isFeatureChecked = function (feature) {
      return feature.checked;
    };

    var getNameFeature = function (feature) {
      return feature.value;
    };

    var checkedFeatures = [].filter.call(filterFeatures, isFeatureChecked).map(getNameFeature);
    var apartmentFeatures = dataApartment.offer.features;

    var callbackCheckFeatures = function (feature) {
      return apartmentFeatures.indexOf(feature) !== -1;
    };

    return (checkedFeatures.length === 0) || (checkedFeatures.every(callbackCheckFeatures));
  };

  var callbackFilterApartments = function (item) {
    return isInRangeType(item) &&
      isInRangePrice(item) &&
      isInRangeRooms(item) &&
      isInRangeGuests(item) &&
      isInRangeFeatures(item);
  };

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
    // var MAX_SIMILAR = 3;

    similarApartments = apartments.filter(callbackFilterApartments);
    // if (similarApartments.length > MAX_SIMILAR) {
    //   similarApartments.splice(MAX_SIMILAR, similarApartments.length - MAX_SIMILAR);
    // }
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
        if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
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

    sortPins.sort(comparePinX);
    for (var i = 0; i < pins.length; i++) {
      sortPins[i].setAttribute('tabindex', ++tabindex);
    }
  };

  var callbackLoadData = function (data) {
    apartments = JSON.parse(data);
    drawSimilarApartments(remapTabIndex);
  };

  var changeFilterHandler = function () {
    if (document.querySelector('.dialog')) {
      document.querySelector('.dialog__close').click();
    }
    drawSimilarApartments(remapTabIndex);
  };

  var getAddressMainPin = function () {
    document.querySelector('#address').value =
      'x: ' + parseInt(getComputedStyle(mainPin).left, 10) +
      ', y: ' + parseInt(getComputedStyle(mainPin).top, 10);
  };

  var moveMainPinHandler = function (evt) {
    var imgTokyo = document.querySelector('.tokyo img');
    var pageHeader = document.querySelector('.header');
    var minX = 0 - mainPin.clientWidth / 2;
    var minY = pageHeader.clientHeight;
    var maxX = imgTokyo.clientWidth - mainPin.clientWidth / 2;
    var maxY = imgTokyo.clientHeight - mainPin.clientHeight;

    return window.moveElement(evt, mainPin, minX, minY, maxX, maxY, getAddressMainPin);
  };

  updatePins();
  window.load(APARTMENTS_DATA, callbackLoadData);
  pinMap.addEventListener('click', selectPinHandler);
  pinMap.addEventListener('keydown', selectPinHandler);
  formFilters.addEventListener('change', changeFilterHandler);
  mainPin.addEventListener('mousedown', moveMainPinHandler);
  getAddressMainPin();
})();
