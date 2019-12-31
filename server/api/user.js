const Router = require("koa-router");
const User = require("../lib/orm_order").User;
const md5 = require("md5-node");
const validator = require("validator");

const router = new Router({
  prefix: "/api"
});

let limit = 10;
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
  let name = ctx.request.body.user_name ? ctx.request.body.user_name : '',
    password = ctx.request.body.password ? ctx.request.body.password : '',
    email = ctx.request.body.email ? ctx.request.body.email : '';

  if (validator.isEmpty(name + '') || validator.isEmpty(password + '')) {
    return ctx.body = {
      status: 10000,
      message: '用户名或密码不能为空！'
    };
  } else {
    if (email && !validator.isEmail(email + '')) {
      return ctx.body = {
        status: 10000,
        message: '邮箱格式不正确！'
      };
    }
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
    return ctx.body = {
      status: 8888,
      message: '创建成功！'
    }
  } else {
    return ctx.body = {
      status: 10001,
      message: '用户名已存在！'
    }
  }
});

router.post("/findUser", async ctx => {
  ctx.body = {
    result: true
  };
});
module.exports = router;
