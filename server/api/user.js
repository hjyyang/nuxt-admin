const Router = require("koa-router");
const UserTables = require("../lib/orm_order").User;

const router = new Router({
	prefix: "/api"
});


let limit = 10;
router.post("/findAllUser", async ctx => {
	var UserTable = await UserTables.findAndCountAll({
		//查询并计数所有
		offset: 0 * limit,
		limit: limit
    });
    console.log(UserTable)
    
	ctx.body = {};
});

module.exports = router;
