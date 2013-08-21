(function() {
  'use strict';

  var requestAnimationFrame = (function() {
    return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ) {
        window.setTimeout(callback, 1000 / 60);
    };
  }());

  window.Rotator = function(rotatorDiv) {
    if(rotatorDiv !== undefined) {
      this.rotatorDiv = rotatorDiv;
      this.elList = rotatorDiv.querySelector('ul');
      this.imageWidth = this.elList.querySelector('img').clientWidth;
      this.length = this.elList.querySelectorAll('li').length;
    }
  };

  window.Rotator.prototype.prepareUI = function() {
    var allListItems = this.elList.querySelectorAll('li'),
    firstListItem = allListItems[0],
    lastListItem = allListItems[allListItems.length - 1];

    if(allListItems.length === 1 || firstListItem.innerHTML !== lastListItem.innerHTML){
      this.elList.appendChild(firstListItem.cloneNode(true));
    }
    this.rotatorDiv.style.overflowX = 'hidden';
  };

  window.Rotator.prototype.draw = function(time) {
    var newPosition = 0;
    time = time || 0;

    newPosition = this.calculatePosition(time);
    this.elList.style.left = this.positionInPixels(newPosition);
    this.queueNextFrame();
  };

  window.Rotator.prototype.queueNextFrame = function() {
    var _this = this;
    requestAnimationFrame(function drawCallBack(time) {
      _this.draw.call(_this, time);
    });
  };

  window.Rotator.prototype.calculatePosition = function(time) {
    var position = 0;
    if(!this.isOnFirstImage(time)){
      position = (this.stepper(time, 3000) - 1) % this.length +
        this.squareCeilingWave(time, 1000, 3);
    }
    return position;
  };

  window.Rotator.prototype.positionInPixels = function(magnitude) {
    return -magnitude * this.imageWidth + 'px';
  };

  window.Rotator.prototype.isOnFirstImage = function(time) {
    return time < 3000;
  };

  window.Rotator.prototype.stepper = function(time, duration) {
    return Math.floor(time / duration);
  };

  window.Rotator.prototype.linearCeilingWave = function(time, duration, frequency) {
    return Math.min(time / duration % frequency, 1);
  };

  window.Rotator.prototype.squareCeilingWave = function(time, duration, frequency) {
    var modTime = (time / duration % frequency);
    if(modTime/2 < 0.5){
      return Math.min((1/2) * modTime * modTime, 1);
    }
    return Math.min((1/2)*((modTime -= 2) * modTime * modTime + 2), 1);
  };
}());
