// theme selection
var rgbRun = false;

	
// set theme from last setion on startup
// window.onload = 
window.onload = function init(){
	setTheme();
}

function setTheme(){
	var themeSelector = document.getElementById('theme-select');
	var currentTheme = localStorage.getItem('theme');
	if(themeSelector === null){
		document.documentElement.setAttribute('data-theme', currentTheme);
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
	document.documentElement.setAttribute('data-theme', e.value);
	localStorage.setItem('theme', e.value);
	rgb();
}


// RGB!!! RAINBOWS FOR DAYS!!!
function rgb() {
	if (localStorage.getItem('theme') === 'crazy'){
		rgbRun = true;
	} else {
		rgbRun = false;
	}
	if (!rgbRun) return;
	// console.log("RGB!!!");
	var animTime = 20;
	var now = new Date().getTime();
	var sync = now / 1000 % animTime;
	var hue = (360 / animTime) * sync;
	document.documentElement.style.setProperty('--rgb', 'hsl(' + hue + ',100%,50%)');
	document.documentElement.style.setProperty('--rgb-d', 'hsl(' + hue + ',100%,25%)');
	document.documentElement.style.setProperty('--rgb-l', 'hsl(' + hue + ',100%,75%)');
	requestAnimationFrame(rgb);
}
// requestAnimationFrame(rgb)

// Hide Navbar when scrolling down.
var prevScrollpos = window.pageYOffset;
var navBar = document.querySelector("header");
var navBarHover = false;
window.onscroll = function() {	
	var currentScrollPos = window.pageYOffset;
	navBar.onmouseover = function(){navBarHover = true}
	navBar.onmouseleave = function(){navBarHover = false}
	console.log("Navbar Hover: "+navBarHover);
	if(prevScrollpos > currentScrollPos || navBarHover || this.navBar.contains(document.activeElement)){
		navBar.style.top = "0";
		navBar.style.boxShadow = "0 .25rem .25rem var(--shad)";		
	}
	else {
		navBar.style.top = "-" + this.navBar.offsetHeight + "px"; // 2.5rem = header height
		navBar.style.boxShadow = "none"; // no shadow
	}
	prevScrollpos = currentScrollPos;
}