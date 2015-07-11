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

// Option characters for Mac keyboard input
var optmap = {
  'å': '☺', // opt-a
  '∫': '☻', // opt-b
  'ç': '♥', // opt-c
  '∂': '♦', // opt-d
  //'é': '♣', // opt-e its a combining character :(
  'ƒ': '♠', // opt-f
  // TODO
};

var cursorX = 0, cursorY = 0;
window.addEventListener('keypress', function(ev) {
  console.log(ev);
  var unichar = String.fromCharCode(ev.charCode); // TODO: comprehensive keymap

  if (!unichar) {
    unichar = '☺';
  }

  if (optmap[unichar]) unichar = optmap[unichar];

  var tt = fromUnicode(unichar);
  if (tt === null) {
    tt = 75;
  }

  if (ev.keyCode === 13) { // ASCII enter/newline
    tt = 12; // trit-text newline
  }

  if (ev.metaKey || ev.ctrlKey) tt = -tt; // TODO: other key

  console.log(cursorX,cursorY);
  t.writeTrits(toTritmap9x14(tt), 9, 14, cursorY, cursorX);
  t.refresh();

  ++cursorX;

  if (tt == 12) { // trit-text newline
    cursorY++;
    cursorX = 0;
  }

  if (cursorX >= t.width/9) {
    cursorX = 0;
    ++cursorY;
  }
  if (cursorY >= t.width/14) {
    cursorY = 0;
    cursorX = 0;
  }
});

  global.t = t;

t.refresh();
