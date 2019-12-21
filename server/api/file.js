const Router = require("koa-router");
const node_path = require("path");
const fileMethod = require("../common/files").fileMethod;
const upload = require("../common/files").upload;

const router = new Router({
	prefix: "/file"
});

router.post("/upload", upload.single("file"), async ctx => {
	//upload.single("file")中的file是表单上传的字段名
	ctx.body = {
		name: ctx.req.file.filename,
		url: ctx.req.file.path.substring(6)
	};
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
	let oldPath = ctx.request.body.oldPath,
		newPath = ctx.request.body.newPath,
		message = null;
	message = await fileMethod.rename(oldPath, newPath);
	ctx.body = { result: message };
});

module.exports = router;
