const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => ({
	authUser: null,
});

export const mutations = {
	SET_USER(state, user) {
		state.authUser = user;
	},
};

export const actions = {
	// nuxtServerInit是由Nuxt.js在服务器渲染每个页面之前调用的
	nuxtServerInit({ commit }, { req }) {
		let auth = null;
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie);
			if (!parsed.authUser) return false;
			auth = new Buffer(
				parsed.authUser.split(".")[1],
				"base64"
			).toString();
			try {
				auth = JSON.parse(auth);
				auth.token = parsed.authUser;
				// console.log(auth);
				commit("SET_USER", auth);
			} catch (err) {
				// 未找到有效的cookie
				console.log(err);
			}
		}
	},
	async login({ commit }, { username, password }) {
		try {
			const { data } = await this.$axios.post("/api/login", {
				user_name: username,
				password: password,
			});
			if (data.result) {
				commit("SET_USER", data);
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				throw new Error("Bad credentials");
			}
			throw error;
		}
	},

	async logout({ commit }) {
		let res = await this.$axios.post("/api/logout");
		if (res.data.result) {
			commit("SET_USER", null);
		}
	},
};
