'use strict';

var Tricanvas = require('./');

window.t = Tricanvas();
console.log(t);

for (var i = 0; i < 100000; ++i)
  t.imageData.data[i] = 128;

t.refresh();
