(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tricanvas = require('./');
var raf = require('raf');

window.t = Tricanvas();
console.log(t);

function fillrandom() {
  for (var i = 10000; i < 81*81*5 /2; ++i) // fill part of canvas with random trits
    t.tritmap[i] = (Math.random()*241-121)|0;

}

for (i = 16400; i < 81*81*5; ++i)
  t.tritmap[i] = 80; // 1000i

for (var i = 0; i < 100; ++i)
  t.writeTrit(-1, i, i);

t.writeTrits('i1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1ii',9,14);
t.writeTrits('i0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0ii',9);
t.writeTrits('i1i1i1i1i',9);
t.writeTrits('1',9);
t.writeTrits('iii',9,14);
t.writeTrits('000000000000000000000111100000011000000011000000011000000011000000011000110011000110011000011110000000000000000000000000000000',9,14,5,2);
t.writeTrits('000000000000000000000iiii000000ii0000000ii0000000ii0000000ii0000000ii000ii00ii000ii00ii0000iiii0000000000000000000000000000000',9,14,6,2);
t.writeTrits('111111111111111111111iiii111111ii1111111ii1111111ii1111111ii1111111ii111ii11ii111ii11ii1111iiii1111111111111111111111111111111',9,14,7,2);
t.writeTrits('111111111111111111111000011111100111111100111111100111111100111111100111001100111001100111100001111111111111111111111111111111',9,14,7,4);

t.refresh();

var g = 0;
raf(function tick() {
  fillrandom();
  t.refresh();

  raf(tick);
});

},{"./":8,"raf":4}],2:[function(require,module,exports){
'use strict';

var BT_DIGIT_TO_N = {
  i:-1,   '-':-1, 't':-1, 'T':-1,
  0:0,    '.':0,
  1:1,    '+':1
};

var N_TO_BT_DIGIT = {
  '-1':'i',
  0:'0',
  1:'1'
};

var pow = function(a,b) {
  // return a**b; // cleaner, but requires ES7 or babel-node --experimental
  return Math.pow(a,b)|0;
};
var pow3 = function(b) {
  return pow(3, b);
};

// parse balanced ternary string to signed integer
function bts2n(s) {
  var n = 0;
  for (var i = 0; i < s.length; ++i) {
    var ch = s.charAt(i);
    var digit = BT_DIGIT_TO_N[ch];
    if (digit === undefined) throw new Error('bts2n('+s+'): invalid digit character: '+ch);
    //console.log(i,digit,3**i,n,s,ch);
    n += pow3(s.length - i - 1) * digit;
  }
  return n;
}


// signed integer to balanced ternary string
function n2bts(n_) {
  var neg = n_ < 0;
  var n = Math.abs(n_);
  var s = '';
  do {
    var digit = n % 3;

    // balance the ternary http://stackoverflow.com/questions/26456597/how-to-convert-from-unbalanced-to-balanced-ternary
    if (digit === 2) {
      digit = -1;
      ++n;
    }

    //console.log('digit',digit,n,n_,s);

    // if number has negative sign, flip all digits
    if (neg) {
      digit = -digit;
    }

    s = N_TO_BT_DIGIT[digit] + s;
    n = ~~(n / 3);    // truncate, not floor! negatives

  } while(n);
  //console.log('n2bts',n_,s);
  return s;
}

module.exports = {
  bts2n: bts2n,
  n2bts: n2bts,
  BT_DIGIT_TO_N: BT_DIGIT_TO_N,
  N_TO_BT_DIGIT: N_TO_BT_DIGIT
};

},{}],3:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
module.exports = function(string, size, options) {
  var escapecolor, i, j, pad, prefix, ref, ref1;
  if (options == null) {
    options = {};
  }
  prefix = typeof string === 'number';
  if (prefix) {
    ref = [string, size], size = ref[0], string = ref[1];
  }
  if (typeof options === 'string') {
    options = {
      char: options
    };
  }
  if (options.char == null) {
    options.char = ' ';
  }
  string = string.toString();
  pad = '';
  if (options.colors) {
    escapecolor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;
    size += string.length - string.replace(escapecolor, '').length;
  }
  size = size - string.length;
  for (i = j = 0, ref1 = size; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
    pad += options.char;
  }
  if (prefix) {
    return pad + string;
  } else {
    return string + pad;
  }
};

},{}],4:[function(require,module,exports){
var now = require('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(global, fn)
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"performance-now":5}],5:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.6.3
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/*
//@ sourceMappingURL=performance-now.map
*/

}).call(this,require('_process'))
},{"_process":9}],6:[function(require,module,exports){
'use strict';

var bts2n = require('balanced-ternary').bts2n;
var n2bts = require('balanced-ternary').n2bts;
var N_TO_BT_DIGIT = require('balanced-ternary').N_TO_BT_DIGIT;
var BT_DIGIT_TO_N = require('balanced-ternary').BT_DIGIT_TO_N;

// get trit value at ith index of n, i of 0=least significant
function get_trit(n,i) {
  // convert entire number to balanced ternary string then slice
  // would be nice to extract without converting everything, see extract_digit(), which
  // works for unbalanced ternary, but balanced converts 2 -> 1i, so individual digit extraction
  // is more difficult -- see https://en.wikipedia.org/wiki/Balanced_ternary#Conversion_from_ternary
  var s = n2bts(n);
  return ~~BT_DIGIT_TO_N[s.charAt(s.length - i - 1)];
}

// set ith trit (0=lst) of n to zero
function clear_trit(n,i) {
  var t0 = get_trit(n,i);
  var t_value = Math.pow(3,i) * t0;
  return n - t_value;
}

// set ith trit (0=lst) of n to trit t=-1, 0, or 1
function set_trit(n,i,t) {
  return clear_trit(n,i) + Math.pow(3,i) * t;
}

// extract trits of n from range a to b (0=lst)
function slice_trits(n,a,b) {
  var s = n2bts(n);
  var ss = s.substring(s.length - b, s.length - a);
  return bts2n(ss);
}
module.exports = {
  get_trit: get_trit,
  clear_trit: clear_trit,
  set_trit: set_trit,
  slice_trits: slice_trits
};

},{"balanced-ternary":7}],7:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],8:[function(require,module,exports){
'use strict';

var n2bts = require('balanced-ternary').n2bts;
var BT_DIGIT_TO_N = require('balanced-ternary').BT_DIGIT_TO_N;
var TRITS_PER_TRYTE = 5; // 5-trit trytes backed by 8-bit bytes Int8Array
var set_trit = require('trit-getset').set_trit;
var pad = require('pad');

function Tricanvas(opts) {
  opts = opts || {};
  this.addressTryteSize = opts.addressTryteSize || 4; // 4 trytes each coordinate (ex: aaaa bbbb)
  this.width = opts.width || Math.pow(3, this.addressTryteSize)*TRITS_PER_TRYTE;
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
  this.tritmap = opts.tritmap || new Int8Array(this.tryteCount);
  if (this.tritmap.length !== this.tryteCount) throw new Error('tritmap option unexpected length: '+this.tritmap.length+' !== '+this.tryteCount);

  this.negativeColor = opts.negativeColor || [255, 0, 0, 255];    // red
  this.zeroColor = opts.zeroColor || [0, 0, 0, 255];          // black
  this.positiveColor = opts.positiveColor || [0, 255, 0, 255];    // green
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

},{"balanced-ternary":2,"pad":3,"trit-getset":6}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
