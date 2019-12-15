// theme selection

// set theme from last setion on startup
// window.onload =
window.addEventListener("load", setTheme);

function setTheme() {
  var themeSelector = document.getElementById("theme-select");
  var currentTheme = localStorage.getItem("theme");
  if (themeSelector === null) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    rgb();
  } else {
    for (var i = 0; i < themeSelector.options.length; i++) {
      if (themeSelector.options[i].value === currentTheme) {
        themeSelector.selectedIndex = i;
        changeTheme(themeSelector);
      }
    }
  }
}

function changeTheme(e) {
  var e = e.options[e.selectedIndex];
  document.documentElement.setAttribute("data-theme", e.value);
  localStorage.setItem("theme", e.value);
  rgb();
}

// RGB!!! RAINBOWS FOR DAYS!!!
function rgb() {
  if (localStorage.getItem("theme") !== "crazy") {
    return;
  }
  // console.log("RGB!!!");
  var animTime = 60;
  var now = new Date().getTime();
  var sync = (now / 1000) % animTime;
  var hue = (360 / animTime) * sync;
  document.documentElement.style.setProperty(
    "--rgb",
    "hsl(" + hue + ",100%,50%)"
  );
  document.documentElement.style.setProperty(
    "--rgb-d",
    "hsl(" + hue + ",100%,25%)"
  );
  document.documentElement.style.setProperty(
    "--rgb-l",
    "hsl(" + hue + ",100%,75%)"
  );
  requestAnimationFrame(rgb);
}
// requestAnimationFrame(rgb)

// Hide Navbar when scrolling down.
var prevScrollpos = window.pageYOffset;
var navBar = document.querySelector("header");
var navBarHover = false;

window.addEventListener("onscroll", showHideNav);
function showHideNav() {
  var currentScrollPos = window.pageYOffset;
  navBar.onmouseover = function() {
    navBarHover = true;
  };
  navBar.onmouseleave = function() {
    navBarHover = false;
  };
  console.log("Navbar Hover: " + navBarHover);
  if (
    prevScrollpos > currentScrollPos ||
    navBarHover ||
    this.navBar.contains(document.activeElement)
  ) {
    navBar.style.top = "0";
    navBar.style.boxShadow = "0 .25rem .25rem var(--shad)";
  } else {
    navBar.style.top = "-" + this.navBar.offsetHeight + "px"; // 2.5rem = header height
    navBar.style.boxShadow = "none"; // no shadow
  }
  prevScrollpos = currentScrollPos;
}

//? EXPERIMENTAL
/*
// MOUSE CURSOR
var div = document.createElement("div");
div.id = "cursor";
var d = div.style;
d.position = "absolute";
d.zIndex = "9999";
d.height = "0px";
d.width = "0px";
d.pointerEvents = "none";
d.boxShadow = "0 0 8rem 4rem rgba(255,255,255,.1)";
d.backgroundBlendMode = "screen"

document.querySelector("body").appendChild(div);

window.addEventListener("mousemove", followCursor);

function followCursor(mouse){
	var x = mouse.pageX;
	var y = mouse.pageY;
	d.top = y + "px";
	d.left = x + "px";
	// console.log("X: " + x);
	// console.log("Y: " + y);
}
*/

// CLOCK IN EMPTY <TIME></TIME>

var allClocks = document.getElementsByTagName("time");
var emptyClocks = [];
if (allClocks != null) {
  
  for (var i = 0; i < allClocks.length; i++) {
    if (allClocks[i].innerHTML === "") {
      emptyClocks.push(allClocks[i]);
    }
  }
  requestAnimationFrame(updateClock);
  window.setInterval(() => requestAnimationFrame(updateClock), 1000);
}
function updateClock(clocks) {
	var d = new Date();
	var time = d.toTimeString();
	time = time.substring(0, time.indexOf(" "));
	for (var i = 0; i < emptyClocks.length; i++) {
		emptyClocks[i].innerHTML = time;
	}

	//! temp
	var bar = document.querySelector("progress");
	if(bar != null){
		bar.max = 60;
		bar.value = d.getSeconds();
	}
	//! temp
}

// QUERY STRING PARSER
var q = new URLSearchParams(location.search);
if (q.has("page")) {
  console.log("page No.: " + q.getAll("page"));
}
if (q.has("id")) {
  console.log("query ID: " + q.get("id"));
}
