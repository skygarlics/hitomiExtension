// ==UserScript==
// @name        hitomi_extension
// @namespace   skgrlcs
// @description hitomi.la extension
// @include     http://hitomi.la/reader/*
// @include     https://hitomi.la/reader/*
// @version     1.01
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
  } else if (e.keyCode == 84) {
    //alert('T pressed');
    togglePager();
  }
}

function addPagerButton() {
  var uol = document.getElementById("singlePage").parentNode.parentNode;
  var lst = document.createElement("li");
  var lnk = document.createElement("a");
  var icn = document.createElement("i");

  icn.setAttribute("class", "icon-time icon-white");

  lnk.appendChild(icn);
  lnk.title     = "t key";
  lnk.id        = "autoPager";
  lnk.innerHTML += " Auto pager";

  lst.appendChild(lnk);
  uol.appendChild(lst);
}

function addTimerBox() {
  var uol = document.getElementById("single-page-select").parentNode.parentNode;
  var lst = document.createElement("li");
  var ipt = document.createElement("input");

  ipt.type = "text";
  ipt.id = "pageTimer";
  ipt.style.width = "40px";
  ipt.value = 0;

  lst.appendChild(ipt);
  lst.style.margin = "5px 0px";

  uol.appendChild(lst);
}

function togglePager() {
  var second = document.getElementById("pageTimer").value;
  if (second < 1 || isNaN((second))) {
    return
  }

  togglePager.flag = togglePager.flag? 0 : 1;
  if (togglePager.flag) {
    var pagerButton = document.getElementById("autoPager");
    pagerButton.parentNode.classList.add("disable");
    pagerButton.childNodes[0].classList.remove("icon-white");

    togglePager.interval = setInterval(unsafeWindow.nextPanel, second*1000);

  } else {
    var pagerButton = document.getElementById("autoPager");
    pagerButton.parentNode.classList.remove("disable");
    pagerButton.childNodes[0].classList.add("icon-white");

    clearInterval(togglePager.interval);
  }
}


// event lister for shortcut
document.addEventListener('keydown', keyPress);
document.addEventListener('wheel', wheelFunction);


// slideshow
addPagerButton();
document.getElementById("autoPager").addEventListener("click", togglePager);
addTimerBox();
