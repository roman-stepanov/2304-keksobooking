'use strict';

window.synchronizeFields = (function () {

  return function (sourceInput, targetInput, sourceValues, targetValues, targetProperty) {
    targetInput[targetProperty] = targetValues[sourceValues.indexOf(sourceInput.value)];
  };
})();
