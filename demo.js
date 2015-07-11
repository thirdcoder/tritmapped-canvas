'use strict';

var Tricanvas = require('./');

window.t = Tricanvas();
console.log(t);

for (var i = 0; i < 81*81*5; ++i)
  t.tritmap[i] = (Math.random()*241-121)|0;
  //t.tritmap[i] = 80; // 1000i

/*
for (var i = 0; i < 100; ++i)
  t.writeTrit(-1, i, i);
  */

t.writeTrits('i1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1ii',9,14);
t.writeTrits('i0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0ii',9);
t.writeTrits('i1i1i1i1i',9);
t.writeTrits('1',9);
t.writeTrits('iii',9,14);

t.refresh();
