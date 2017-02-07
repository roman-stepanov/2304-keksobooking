'use strict';

window.synchronizeFields = function (syncElement1, syncElement2, syncArr1, syncArr2, property) {

  syncElement2[property] = syncArr2[syncArr1.indexOf(syncElement1.value)];
};
