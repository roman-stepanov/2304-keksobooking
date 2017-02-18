'use strict';

window.load = (function () {
  var onLoadXHR = null;

  var loadHandler = function (evt) {
    if (typeof onLoadXHR === 'function') {
      onLoadXHR(evt.target.response);
    }
  };

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    onLoadXHR = onLoad;

    xhr.addEventListener('load', loadHandler);
    xhr.open('GET', url);
    xhr.send();
  };
})();
