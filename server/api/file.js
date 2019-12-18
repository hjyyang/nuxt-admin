const Router = require("koa-router");
const node_path = require("path");
const fileMethod = require("../common/files").fileMethod;

const router = new Router({
	prefix: "/file"
});

router.get("/upload", async ctx => {
	ctx.body = { a: "123" };
});

router.get("/get", async ctx => {
	let fileList = await fileMethod.getAll();
	ctx.body = {
		files: fileList
	};
});

router.post("/delete", async ctx => {
	let path = ctx.request.body.filePath,
		result = await fileMethod.delete(path);
	ctx.body = {
		result: result
	};
});

router.get("/modify", async ctx => {
	ctx.body = { a: "123" };
});

module.exports = router;
