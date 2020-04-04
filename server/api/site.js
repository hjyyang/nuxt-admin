const Router = require("koa-router");
const {
	Post,
	mySequelize,
	Relationship,
	Category,
} = require("../lib/orm_order");

const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = new Router({
	prefix: "/api",
});

router.get("/searchSite", async (ctx) => {
	return (ctx.body = {});
});

module.exports = router;
