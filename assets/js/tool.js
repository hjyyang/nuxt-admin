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
	anchor: function(duration, offsetTop) {
		options = {
			start: window ? window.scrollY : 0,
			prop: "scrollTo",
			end: offsetTop
				? this.elem.offsetTop - offsetTop
				: this.elem.offsetTop,
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
	getTimeStamp: time => {
		return new Date(time).getTime();
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

function lazy() {
	//返回浏览器的可视区域位置
	function getClient() {
		var l, t, w, h;
		l = document.documentElement.scrollLeft || document.body.scrollLeft;
		t = document.documentElement.scrollTop || document.body.scrollTop;
		w = document.documentElement.clientWidth;
		h = document.documentElement.clientHeight;
		return {
			left: l,
			top: t,
			width: w,
			height: h
		};
	}

	function getItemRec(item) {
		//返回待加载资源位置
		var l = 0,
			t = 0,
			w,
			h,
			p;
		w = item.offsetWidth;
		h = item.offsetHeight;
		l = item.offsetLeft;
		t = item.offsetTop;
		p = item.offsetParent;
		while (p != null) {
			l += p.offsetLeft;
			t += p.offsetTop;
			p = p.offsetParent;
		}
		return {
			left: l,
			top: t,
			width: w,
			height: h
		};
	}

	function cross(rect1, rect2) {
		//判断两个矩形是否相交,返回一个布尔值
		var lc1, lc2, tc1, tc2, w1, h1;
		lc1 = rect1.left + rect1.width / 2;
		lc2 = rect2.left + rect2.width / 2;
		tc1 = rect1.top + rect1.height / 2;
		tc2 = rect2.top + rect2.height / 2;
		w1 = (rect1.width + rect2.width) / 2;
		h1 = (rect1.height + rect2.height) / 2;
		return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1;
	}

	function currentShow(arr, rect1, callback) {
		//比较某个目标区域是否呈现在浏览器区域
		let rect2;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]) {
				rect2 = getItemRec(arr[i]);
				if (cross(rect1, rect2)) {
					callback(arr[i]);
				}
			}
		}
	}

	function autocheck(arr) {
		//检测目标对象是否出现在客户区
		var rect1 = getClient();
		currentShow(arr, rect1, function(obj) {
			//加载资源...
			if (obj.getAttribute("data-src")) {
				obj.src = obj.getAttribute("data-src");
				//加载资源后，删除监测
				obj.classList.remove("lazyload");
				obj.classList.add("lazyloaded");
			}
		});
	}
	var lazyArr = document.querySelectorAll(".lazyload");
	autocheck(lazyArr);

	window.addEventListener("scroll", function() {
		lazyArr = document.querySelectorAll(".lazyload");
		if (lazyArr.length <= 0) return false;
		autocheck(lazyArr);
	});
	window.addEventListener("resize", function() {
		lazyArr = document.querySelectorAll(".lazyload");
		if (lazyArr.length <= 0) return false;
		autocheck(lazyArr);
	});
}

Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1
					? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

yTool.lazysize = yTool.prototype.lazy = lazy;

export default yTool;
