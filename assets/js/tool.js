function ytool() {
	"use strict";
	this.init = function() {};
	this.anchor = function(...a) {
		if (!window) return;
		let move,
			goTo = window.scrollY,
			step = a[0] / a[1];

		if (window.scrollY - a[0] > 0) {
			//向上移动
			move = setInterval(function() {
				if (goTo > a[0]) {
					goTo = goTo - step;
					window.scrollTo(0, goTo);
				} else {
					window.clearInterval(move);
				}
			}, 0);
		} else {
			move = setInterval(function() {
				if (goTo < a[0]) {
					goTo = goTo + step;
					window.scrollTo(0, goTo);
				} else {
					window.clearInterval(move);
				}
			}, 0);
		}
	};
}

export default ytool;
