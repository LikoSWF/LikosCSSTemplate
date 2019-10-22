	// theme selection
		var theme = document.getElementById('theme');
		var currentTheme = localStorage.getItem('theme');

		// set theme from last setion on startup
		window.onload = function setTheme() {
			for (var i = 0; i < theme.options.length; i++) {
				if (theme.options[i].value === currentTheme) {
					theme.selectedIndex = i;
					changeTheme(theme);
				}
			}
		}

		function changeTheme(e) {
			var e = e.options[e.selectedIndex];
			document.documentElement.setAttribute('data-theme', e.value);
			localStorage.setItem('theme', e.value);
		}


		// RGB!!! RAINBOWS FOR DAYS!!!

		function rgb() {
			var animTime = 20;
			var now = new Date().getTime();
			var sync = now / 1000 % animTime;
			var hue = (360 / animTime) * sync;
			document.documentElement.style.setProperty('--rgb', 'hsl(' + hue + ',100%,50%)');
			document.documentElement.style.setProperty('--rgb-d', 'hsl(' + hue + ',100%,25%)');
			document.documentElement.style.setProperty('--rgb-l', 'hsl(' + hue + ',100%,75%)');
			requestAnimationFrame(rgb);
		}
		requestAnimationFrame(rgb);


		// Hide Navbar when scrolling down.
		var prevScrollpos = window.pageYOffset;
		var navBar = document.querySelector("header");
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				navBar.style.top = "0";
				navBar.style.boxShadow = "0 .25rem .25rem var(--shad, #0003)";
				
			} else {
				navBar.style.top = "-" + document.querySelector("header").offsetHeight + "px"; // 2.5rem = header height
				navBar.style.boxShadow = "none"; // no shadow
			}
			prevScrollpos = currentScrollPos;
		}