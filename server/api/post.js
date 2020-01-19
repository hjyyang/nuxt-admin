const Router = require("koa-router");
const User = require("../lib/orm_order").User;

const router = new Router({
	prefix: "/api"
});

router.post("/addPost", async ctx => {
	
	ctx.body = {
		result: true
	};
});