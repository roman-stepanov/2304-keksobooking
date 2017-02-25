'use strict';

window.synchronizeFields = (function () {
  return function (sourceInput, targetInput, sourceValues, targetValues, targetProperty, onFieldsSynchronize) {
    if (typeof onFieldsSynchronize === 'function') {
      onFieldsSynchronize(sourceInput, targetInput, sourceValues, targetValues, targetProperty);
    }
  };
})();
