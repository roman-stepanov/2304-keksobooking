'use strict';

window.synchronizeFields = (function () {

  return function (sourceInput, targetInput, sourceValues, targetValues, targetProperty, callback) {
    if (typeof callback === 'function') {
      callback(sourceInput, targetInput, sourceValues, targetValues, targetProperty);
    }
  };
})();
