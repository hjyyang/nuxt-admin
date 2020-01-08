const Koa = require("koa");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
//------------引入bodyParser  -----------------
const bodyParser = require("koa-bodyparser");

//------------引入koa-jwt做路由鉴权-----------------
const jwt = require("koa-jwt");
//鉴权密钥，需要与发放到token密钥一致
const SECRET = "this is my secret";

//------------引入接口 start-----------------
const file = require("./api/file");
const user = require("./api/user");
//------------引入接口 end-----------------

const app = new Koa();

//------------使用 bodyParser 处理http请求  -----------------
app.use(bodyParser());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = app.env !== "production";

async function start() {
	// Instantiate nuxt.js
	const nuxt = new Nuxt(config);

	const {
		host = process.env.HOST || "127.0.0.1",
		port = process.env.PORT || 3000
	} = nuxt.options.server;

	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt);
		await builder.build();
	} else {
		await nuxt.ready();
	}

	app.use((ctx, next) => {
		console.log(ctx.cookies.get('authUser'));
		return next();
	});

	app.use((ctx, next) => {
		if (ctx.url.match(/^\/api/) || ctx.url.match(/^\/file/)) {
			//路由判断是否以/api或/file开头到url，是则去往下一个jwt中间件，否则直接输入内容
			return next();
		} else {
			ctx.status = 200;
			ctx.respond = false; // Bypass Koa's built-in response handling
			ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
			nuxt.render(ctx.req, ctx.res);
		}
	});
	//使用路由鉴权中间件，判断请求到路由是否需要鉴权
	app.use(
		jwt({ secret: SECRET }).unless({
			path: [/^\/api\/login/, /^\/api\/register/]
		})
	);

	//------------使用接口url start-----------------
	app.use(file.routes()).use(file.allowedMethods());
	app.use(user.routes()).use(user.allowedMethods());
	//------------使用接口url end-----------------

	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	});
}

start();
