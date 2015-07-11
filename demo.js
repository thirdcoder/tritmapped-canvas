'use strict';

var Tricanvas = require('./');

window.t = Tricanvas();
console.log(t);

for (var i = 0; i < 81*81*5; ++i)
  t.tritmap[i] = 61; // stripes, 1i1i1

t.refresh();
