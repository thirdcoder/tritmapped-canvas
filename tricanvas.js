'use strict';

function Tricanvas(opts) {
  opts = opts || {};
  this.width = opts.width || 405;
  this.height = opts.height || this.width;
  this.canvas = opts.canvas;
  if (!this.canvas) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = this.border || '1px dotted black';
    document.body.appendChild(this.canvas);
  }

  this.context = this.canvas.getContext('2d');
  this.imageData = this.context.createImageData(this.width, this.height);
}

Tricanvas.prototype.refresh = function() {
  this.context.putImageData(this.imageData, 0, 0);
};

module.exports = function(opts) {
  return new Tricanvas(opts);
}
