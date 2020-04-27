const Koa = require("koa");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
//------------引入bodyParser  -----------------
const bodyParser = require("koa-bodyparser");

//------------引入koa-jwt做路由鉴权-----------------
// const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const tokenOp = require("./common/token");

//------------引入接口 start-----------------
const file = require("./api/file");
const user = require("./api/user");
const post = require("./api/post");
const site = require("./api/site");
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
		port = process.env.PORT || 3000,
	} = nuxt.options.server;

	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt);
		await builder.build();
	} else {
		await nuxt.ready();
	}

	app.use((ctx, next) => {
		if (
			ctx.url.match(/^\/api\/login/) ||
			ctx.url.match(/^\/api\/register/) ||
			ctx.url.match(/^\/port/)
		) {
			return next();
		}
		if (ctx.url.match(/^\/api/) || ctx.url.match(/^\/file/)) {
			//路由判断是否以/api或/file开头的url，是则进行鉴权，否则直接输入内容
			let authorization = ctx.headers.authorization,
				token;
			if (ctx.headers) {
				if (!authorization) {
					ctx.status = 401;
					return (ctx.body = "Bad permissions");
				}
				token = authorization.split(" ")[1];
				try {
					let decoded = jsonwebtoken.verify(token, tokenOp.secret),
						refresh = tokenOp.refreshFc(decoded);
					if (refresh) {
						//在刷新时间范围内请求则刷新令牌
						try {
							let newToken = jsonwebtoken.sign(
								{
									id: decoded.id,
									userName: decoded.userName,
									email: decoded.email,
									role: decoded.role,
								},
								tokenOp.secret,
								{
									expiresIn: tokenOp.validTime + "",
								}
							);
							ctx.cookies.set(
								"authUser",
								JSON.stringify(newToken),
								{
									maxAge: tokenOp.validTime,
									overwrite: true,
								}
							);
						} catch (err) {
							console.log(err);
						}
					}
				} catch (err) {
					ctx.status = 401;
					return (ctx.body = "Bad permissions");
				}
			}
			return next();
		} else {
			ctx.status = 200;
			ctx.respond = false; // Bypass Koa's built-in response handling
			ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
			nuxt.render(ctx.req, ctx.res);
		}
	});

	//------------使用接口url start-----------------
	app.use(file.routes()).use(file.allowedMethods());
	app.use(user.routes()).use(user.allowedMethods());
	app.use(post.routes()).use(post.allowedMethods());
	app.use(site.routes()).use(site.allowedMethods());
	//------------使用接口url end-----------------

	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	});
}

start();
