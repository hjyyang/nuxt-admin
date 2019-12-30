const Router = require("koa-router");
const User = require("../lib/orm_order").User;
const md5 = require("md5-node");
const validator = require("validator");

const router = new Router({
	prefix: "/api"
});

let limit = 10;
router.post("/findAllUser", async ctx => {
	let page = ctx.request.body.page ? ctx.request.body.page : "",
		pageStr = page + "";
	if (validator.isInt(pageStr) && !validator.isEmpty(pageStr)) {
		let offset = page - 1;
		var UserTable = await User.findAndCountAll({
			//查询并计数所有
			offset: offset * limit,
			limit: limit
		});

		ctx.body = {
			count: UserTable.count,
			users: UserTable.rows
		};
	} else {
		ctx.body = {
			status: 10000,
			massage: "请输入正确字段或值！"
		};
	}
});

router.post("/updateUser", async ctx => {
	let id = ctx.request.body.user_id,
		role = ctx.request.body.role;
	ctx.body = {
		result: true
	};
});

router.post("/deteleUser", async ctx => {
	let id = ctx.request.body.user_id;

	ctx.body = {
		result: true
	};
});

router.post("/addUser", async ctx => {
	let name = ctx.request.body.user_name,
		password = ctx.request.body.password,
		email = ctx.request.body.email;

	User.create({
		name: name,
		password: password,
		email: email
	}).then(res => {
		// console.log('123,',res);
	});

	ctx.body = {
		result: true
	};
});

router.post("/findUser", async ctx => {
	ctx.body = {
		result: true
	};
});
module.exports = router;
