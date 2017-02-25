'use strict';

window.moveElement = (function () {
  var element = null;
  var rangeMove = null;
  var onElementMove = null;
  var startPoint = null;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startPoint.x - moveEvt.pageX,
      y: startPoint.y - moveEvt.pageY
    };

    var newPosition = {
      x: element.offsetLeft - shift.x,
      y: element.offsetTop - shift.y
    };

    if (newPosition.x > rangeMove.minX && newPosition.x < rangeMove.maxX) {
      element.style.left = newPosition.x + 'px';
    }

    if (newPosition.y > rangeMove.minY && newPosition.y < rangeMove.maxY) {
      element.style.top = newPosition.y + 'px';
    }

    startPoint = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    if (typeof onElementMove === 'function') {
      onElementMove();
    }
  };

  var elementMoves = false;

  var onMouseUp = function (upEvt) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    elementMoves = false;
  };

  return function (evt, movingElement, minX, minY, maxX, maxY, elementMoveHandler) {
    evt.preventDefault();

    if (elementMoves) {
      onMouseUp();
    }

    element = movingElement;
    rangeMove = {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
    onElementMove = elementMoveHandler;
    elementMoves = true;
    startPoint = {
      x: evt.pageX,
      y: evt.pageY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
