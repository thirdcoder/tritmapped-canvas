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
