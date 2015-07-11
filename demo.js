'use strict';

var Tricanvas = require('./');

var toTritmap9x14 = require('trit-text').toTritmap9x14;
var fromUnicode = require('trit-text').fromUnicode;

window.t = Tricanvas();
console.log(t);

/*
for (var i = 0; i < 81*81*5; ++i)
  t.tritmap[i] = (Math.random()*241-121)|0;
  //t.tritmap[i] = 80; // 1000i
*/

/*
for (var i = 0; i < 100; ++i)
  t.writeTrit(-1, i, i);
  */

t.writeTrits(toTritmap9x14(-75), 9, 14, 0, 0);
t.writeTrits(toTritmap9x14(fromUnicode('☺')), 9, 14, 0, 1);
t.writeTrits(toTritmap9x14(-fromUnicode('X')), 9, 14, 0, 2);
t.writeTrits(toTritmap9x14(-fromUnicode('T')), 9, 14, 1, 0);
//t.writeTrits('i1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1iii1i1i1i1i1i1i1i1ii',9);
//t.writeTrits('i0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0iii0i0i0i0i0i0i0i0ii',9);
//t.writeTrits('i1i1i1i1i',9);
//t.writeTrits('1',9);
//t.writeTrits('iii',9,14);

var cursorX = 0, cursorY = 0;
window.addEventListener('keypress', function(ev) {
  console.log(ev);
  var unichar = String.fromCharCode(ev.charCode); // TODO: comprehensive keymap

  if (!unichar) {
    unichar = '☺';
  }

  var tt = fromUnicode(unichar);

  if (ev.metaKey) tt = -tt; // TODO: other key

  console.log(cursorX,cursorY);
  t.writeTrits(toTritmap9x14(tt), 9, 14, cursorY, cursorX);
  t.refresh();

  ++cursorX;
  if (cursorX > 32) {
    cursorX = 0;
    ++cursorY;
  }
});

  global.t = t;

t.refresh();
