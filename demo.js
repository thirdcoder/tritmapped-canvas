'use strict';

var Tricanvas = require('./');

window.t = Tricanvas();
console.log(t);

/*
for (var i = 0; i < 81*81*5; ++i)
  t.tritmap[i] = (Math.random()*241-121)|0;
  //t.tritmap[i] = 80; // 1000i
*/

for (var i = 0; i < 100; ++i)
  t.writeTrit(-1, i, i);

t.refresh();
