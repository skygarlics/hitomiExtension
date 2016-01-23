// ==UserScript==
// @name        hitomi_extension
// @namespace   skgrlcs
// @description hitomi.la extension
// @include     http://hitomi.la/reader/*
// @include     https://hitomi.la/reader/*
// @version     1.03
// @grant       none
// ==/UserScript==

function wheelFunction(e) {
  if (e.deltaY > 0) {
    //alert('Wheel down');
    nextPanel();
  } else if (e.deltaY < 0) {
    //alert('Wheel up');
    prevPanel();
  }
}

function keyPress(e) {
  if (e.keyCode == 81) {
    //alert('Q pressed');
    nextPanel();
  } else if (e.keyCode == 69) {
    //alert('E pressed');
    prevPanel();
  } else if (e.keyCode == 84) {
    //alert('T pressed');
    togglePager();
  }
}

function addTimerButton() {
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

  ipt.type        = "text";
  ipt.id          = "pageTimer";
  ipt.style.width = "40px";
  ipt.value       = "0";

  lst.appendChild(ipt);
  lst.style.margin = "5px 0px";

  uol.appendChild(lst);
}


// hijack old drawpanel()
var oldDraw = unsafeWindow.drawPanel;
unsafeWindow.drawPanel = drawPanel;

function drawPanel() {
  // call old function first
  oldDraw();
     
  var imgSpace = document.getElementById("comicImages");
  var img = imgSpace.firstChild;
  
  // make buttons
  var leftBtn = document.createElement("a");
  leftBtn.id = "leftBtn";
  var lefti = document.createElement("i")
  lefti.setAttribute("class", "icon-chevron-left");
  leftBtn.appendChild(lefti);
    
  var rightBtn = document.createElement("a");
  rightBtn.id = "rightBtn";
  var righti = document.createElement("i")
  righti.setAttribute("class", "icon-chevron-right");  
  rightBtn.appendChild(righti);
 
  // set css
  var common = "position: fixed;width: 30%;height: 100%;font-size: 50px; color: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center;" 
  leftBtn.style.cssText = common+"left: 0;";
  rightBtn.style.cssText = common+"right: 0;";
  
  // add button
  imgSpace.insertBefore(leftBtn,img);
  imgSpace.insertBefore(rightBtn,img);
  
  // add eventlistener
  document.getElementById("leftBtn").addEventListener("click", nextPanel);
  document.getElementById("rightBtn").addEventListener("click", prevPanel);
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

    togglePager.interval = setInterval(nextPanel, second*1000);

  } else {
    var pagerButton = document.getElementById("autoPager");
    pagerButton.parentNode.classList.remove("disable");
    pagerButton.childNodes[0].classList.add("icon-white");

    clearInterval(togglePager.interval);
  }
}

document.addEventListener('keydown', keyPress);
document.addEventListener('wheel', wheelFunction);

addTimerButton();
document.getElementById("autoPager").addEventListener("click", togglePager);
addTimerBox();

addPageButton();