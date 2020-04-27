//使用百度统计方法
export default ({ app: { router }, store }) => {
	router.afterEach((to, from) => {
		/* 每次路由变更时进行pv统计 */
		try {
			window._hmt = window._hmt || [];
			window._hmt.push(["_trackPageview", to.fullPath]);
		} catch (e) {}
	});
};