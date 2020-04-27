module.exports = {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		title: "此间少年",
		meta: [
			{
				charset: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				hid: "description",
				name: "description",
				content: "jon的个人博客网站，专注于前端开发",
            },
            {
                name: "keywords",
                content: "编程,开发,前端,html,css,javascript,node"
            }
		],
		link: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "stylesheet",
				href: "//at.alicdn.com/t/font_1358674_ubeavlpof9.css",
			},
		],
		script: [
            {
                src: "https://hm.baidu.com/hm.js?df1b7cadc1b1a53f106bddec21ca393b"
            },
			{
				src: "//at.alicdn.com/t/font_1478929_tapd4n12v3j.js",
			},
		],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
        color: "#fe4e0e",
        failedColor: "red"
	},
	/*
	 ** Global CSS
	 */
	css: ["element-ui/lib/theme-chalk/index.css", "@/assets/css/main.scss"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{
			src: "@/plugins/element-ui",
			ssr: true,
		},
		{
			src: "@/plugins/vue-mavon-editor",
			srr: false,
        },
        {
            src: "@/plugins/ga"
        },
		"~/plugins/axios",
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	devModules: [],
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		proxy: true,
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: ["@nuxtjs/axios"],
	/*
	 ** Build configuration
	 */
	build: {
		analyze: true,
		transpile: [/^element-ui/],
		babel: {
			plugins: [
				[
					"component",
					{
						libraryName: "element-ui",
						styleLibraryName: "theme-chalk",
					},
				],
			],
			comments: true,
		},
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
	},
};
