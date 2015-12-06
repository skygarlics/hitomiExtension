// ==UserScript==
// @name        hitomi_extension
// @namespace   skgrlcs
// @description hitomi.la extension
// @include     http://hitomi.la/reader/*
// @include     https://hitomi.la/reader/*
// @version     1
// @grant       none
// ==/UserScript==

function wheelFunction(e) {
  if (e.deltaY > 0) {
    //alert('Wheel down');
    unsafeWindow.nextPanel();
  } else if (e.deltaY < 0) {
    //alert('Wheel up');
    unsafeWindow.prevPanel();
  }
}

function keyPress(e) {
  if (e.keyCode == 81) {
    //alert('Q pressed');
    unsafeWindow.nextPanel();
  } else if (e.keyCode == 69) {
    //alert('E pressed');
    unsafeWindow.prevPanel();
  }
}

document.addEventListener('keydown', keyPress);
document.addEventListener('wheel', wheelFunction);