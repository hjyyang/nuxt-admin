import { Loading, MessageBox } from "element-ui";

let loading;

function startLoading() {
	loading = Loading.service({
		lock: true,
		text: "加载中……",
		background: "rgba(0, 0, 0, 0.7)"
	});
}

function endLoading() {
	loading.close();
}

export default function (app) {
	let axios = app.$axios;
	//设置axios请求拦截器
	// app.$axios.interceptors.request.use(config => {
	// 	console.log(config);
	// });

	// //设置axios响应拦截器
	// app.$axios.interceptors.response.use(config => {
	// 	// console.log(config);
	// });
	//此处写法功能与下面到效果一致

	axios.onRequest(config => {
		if (app.store.state.authUser) {
			config.headers.authorization = "Bearer " + app.store.state.authUser.token;
		}
		console.log(config)
		if (process.browser) {
			//判断是否为客户端（必须）
			startLoading();
		}
	});

	axios.onResponse(response => {
		if (process.browser) {
			//判断是否为客户端（必须）
			endLoading();
		}
	});

	axios.onError(error => {
		const code = parseInt(error.response && error.response.status);
		endLoading();
		if (code === 400) {
			app.redirect("/400");
		}
		if (code === 401) {
			MessageBox.confirm("无权限访问", "提示", {
				confirmButtonText: "去登录",
				cancelButtonText: "去首页",
				type: "warning"
			})
				.then(() => {
					app.redirect("/login");
				})
				.catch(() => {
					app.redirect("/");
				});
		}
	});
}
