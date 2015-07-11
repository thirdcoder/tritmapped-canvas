'use strict';

var n2bts = require('balanced-ternary').n2bts;
var BT_DIGIT_TO_N = require('balanced-ternary').BT_DIGIT_TO_N;
var TRITS_PER_TRYTE = 5; // 5-trit trytes backed by 8-bit bytes Int8Array
var set_trit = require('trit-getset').set_trit;
var pad = require('pad');

function Tricanvas(opts) {
  opts = opts || {};
  this.width = opts.width || Math.pow(3, 4)*TRITS_PER_TRYTE;
  this.height = opts.height || this.width;
  this.scaleW = 1;
  this.scaleH = 1;
  this.canvas = opts.canvas;
  if (!this.canvas) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = this.width * this.scaleW + 'px';
    this.canvas.style.height = this.height * this.scaleH + 'px';
    this.canvas.style.border = this.border || '1px solid black';
    this.canvas.style.imageRendering = 'pixelated';
    document.body.appendChild(this.canvas);
  }

  this.context = this.canvas.getContext('2d');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.imageData = this.context.createImageData(this.width, this.height);

  this.tritCount = this.width * this.height;
  this.tryteCount = this.tritCount / TRITS_PER_TRYTE;
  if ((this.tryteCount|0) !== this.tryteCount) throw new Error('non-integral tryte count: ' + tryteCount + ', trits='+this.tritCount);
  this.tritmap = new Int8Array(this.tryteCount);

  this.negativeColor = [255, 0, 0, 255];    // red
  this.zeroColor = [0, 0, 0, 255];          // black
  this.positiveColor = [0, 255, 0, 255];    // green
}

Tricanvas.prototype.refresh = function() {
  for (var i = 0; i < this.tryteCount; ++i) {
    var tryte = this.tritmap[i];
    var trits = pad(5, n2bts(tryte), '0');

    for (var j = 0; j < TRITS_PER_TRYTE; ++j) {
      var index = i * TRITS_PER_TRYTE + j;

      var trit = BT_DIGIT_TO_N[trits.charAt(j)];

      var color;

      if (trit === -1) {
        color = this.negativeColor;
      } else if (trit === 1) {
        color = this.positiveColor;
      } else {
        color = this.zeroColor;
      }

      this.imageData.data[index * 4 + 0] = color[0];
      this.imageData.data[index * 4 + 1] = color[1];
      this.imageData.data[index * 4 + 2] = color[2];
      this.imageData.data[index * 4 + 3] = color[3];
    }
  }
  //console.log(this.imageData);

  this.context.putImageData(this.imageData, 0, 0);
};

Tricanvas.prototype.writeTrit = function(trit, x, y) {
  var index = y * this.width + x;

  var tryteIndex = (index / TRITS_PER_TRYTE)|0;
  var tritIndex = TRITS_PER_TRYTE - (index % TRITS_PER_TRYTE) - 1;

  this.tritmap[tryteIndex] = set_trit(this.tritmap[tryteIndex], tritIndex, trit);
};

Tricanvas.prototype.writeTrits = function(bts, width, height, rowStart, colStart) {
  rowStart = rowStart || 0;
  colStart = colStart || 0;

  for (var i = 0; i < bts.length; ++i) {
    var trit = BT_DIGIT_TO_N[bts.charAt(i)];
    if (trit === undefined) throw new Error('writeTrits('+bts+'): invalid trit: '+trit);

    var row = ((i / width)|0) + height*rowStart;
    var col = i % width + width*colStart;
    //console.log(i,row,col,trit);
    this.writeTrit(trit, col, row);
  }
};

module.exports = function(opts) {
  return new Tricanvas(opts);
}
