const Router = require("koa-router");
const User = require("../lib/orm_order").User;
const md5 = require("md5-node");
const validator = require("validator");
//引入jsonwebtoken发放令牌
const jsonwebtoken = require("jsonwebtoken");
//发放token密钥，需要与鉴权密钥一致
const SECRET = "this is my secret";

const router = new Router({
	prefix: "/api"
});

let limit = 10,
	userNameArr = [];
router.post("/findAllUser", async ctx => {
	let page = ctx.request.body.page;
	page = page ? page : "";
	if (validator.isInt(page + "") && !validator.isEmpty(page + "")) {
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
	let user_id = ctx.request.body.user_id,
		name = ctx.request.body.name,
		email = ctx.request.body.email,
		WeChat = ctx.request.body.WeChat,
		role = ctx.request.body.role;

	ctx.body = {
		result: true
	};
});

router.post("/deteleUser", async ctx => {
	let userId = ctx.request.body.user_id;
	userId ? userId : "";
	if (validator.isEmpty(userId + "") || !validator.isInt(userId + "")) {
		return (ctx.body = {
			status: 10000,
			message: "请输入正确字段或值！"
		});
	}
	let result = await User.destroy({
		where: {
			id: userId
		}
	});
	if (result === 0) {
		return (ctx.body = {
			status: 10001,
			message: "该用户不存在！"
		});
	}
	ctx.body = {
		status: 8888,
		message: "操作成功！"
	};
});

router.post("/register", async ctx => {
	let name = ctx.request.body.user_name ? ctx.request.body.user_name : "",
		password = ctx.request.body.password ? ctx.request.body.password : "",
		email = ctx.request.body.email ? ctx.request.body.email : "";

	if (validator.isEmpty(name + "") || validator.isEmpty(password + "")) {
		return (ctx.body = {
			status: 10000,
			message: "用户名或密码不能为空！"
		});
	} else {
		if (email && !validator.isEmail(email + "")) {
			return (ctx.body = {
				status: 10000,
				message: "邮箱格式不正确！"
			});
		}
	}
	//处理并发情况下用户名重复
	if (userNameArr.indexOf(name) !== -1) {
		return (ctx.body = {
			status: 10003,
			message: "用户名已存在或有用户正在使用该用户名注册！"
		});
	} else {
		userNameArr.push(name);
	}
	let result = await User.findOrCreate({
		where: {
			name: name
		},
		defaults: {
			password: md5(password),
			email: email
		}
	});
	if (result[1]) {
		return (ctx.body = {
			status: 8888,
			message: "创建成功！"
		});
	} else {
		return (ctx.body = {
			status: 10001,
			message: "用户名已存在！"
		});
	}
});

router.post("/login", async ctx => {
	let user_name = ctx.request.body.user_name,
		password = ctx.request.body.password,
		result = null;
	if (!user_name || !password) {
		return (ctx.body = {
			status: 10000,
			message: "用户名或密码不能为空！"
		});
	}
	result = await User.findOne({
		where: {
			name: user_name,
			password: md5(password)
		}
	});
	if (!result) {
		return (ctx.body = {
			status: 10000,
			message: "用户名或密码错误！"
		});
	}

	ctx.body = {
		result: true,
		token: jsonwebtoken.sign(
			{
				id: result.dataValues.id,
				userName: result.dataValues.name,
				email: result.dataValues.email,
				role: result.dataValues.role
			},
			SECRET,
			{ expiresIn: "1h" }
		)
	};
});

router.post("/logout", async ctx => {});

module.exports = router;
