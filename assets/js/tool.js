var inProgress = null,
	options = {};

function yTool(elem) {
	return new yTool.prototype.init(elem);
}
yTool.prototype = {
	constructor: yTool,
	init: function(elem) {
		this.elem = elem ? elem : null;
	},
	anchor: function(duration) {
		options = {
			start: window ? window.scrollY : 0,
			prop: "scrollTo",
			end: this.elem.offsetTop,
			duration: duration,
			startTime: Date.now(),
			unit: "px"
		};
		inProgress = true;
		animate();
	},
	run: function(prop, now) {
		if (prop === "scrollTo") {
			window.scrollTo(0, now);
		}
	},
	lazy: function() {
        
    }
};
yTool.prototype.init.prototype = yTool.prototype;

function tick() {
	//获取动画进度
	var currentTime = Date.now(),
		remaining = Math.max(
			0,
			options.startTime + options.duration - currentTime
		),
		temp = remaining / options.duration || 0,
		percent = 1 - temp;
	return percent;
}

function animate() {
	//持续执行动画函数
	if (inProgress) {
		if (document.hidden === false && window.requestAnimationFrame) {
			window.requestAnimationFrame(animate);
		}
		let percent = tick(),
			now = (options.end - options.start) * percent + options.start;
		yTool.prototype.run(options.prop, now);
		if (percent >= 1) {
			inProgress = null;
		}
	}
}

export default yTool;
