'use strict';

var Tricanvas = require('./');

window.t = Tricanvas();
console.log(t);

for (var i = 0; i < 81*81*5; ++i)
  t.tritmap[i] = 80; // 1000i

t.refresh();
