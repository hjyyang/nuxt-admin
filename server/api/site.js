const Router = require("koa-router");
const {
	Post,
	mySequelize,
	Relationship,
	Category,
} = require("../lib/orm_order");

const sequelize = require("sequelize");
const Op = sequelize.Op;
const tool = require("../common/tool");

const router = new Router({
	prefix: "/port",
});

router.get("/searchSite", async (ctx) => {
	return (ctx.body = {});
});

//时间格式化数据结构函数
function formatData(data) {
	let result = {};
	for (let i in data) {
		let item = data[i].publishedAt;
		if (result[new Date(item).getFullYear()]) {
			//判断对象内年份是否存在
			if (
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				]
			) {
				//判断对象内月份是否存在
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				].push(data[i]);
			} else {
				//月份不存在则赋值数组且将数据push进数组
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				] = [];
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				].push(data[i]);
			}
		} else {
			//年份不存在则赋值对象
			result[new Date(item).getFullYear()] = {};
			if (
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				]
			) {
				//判断对象内月份是否存在
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				].push(data[i]);
			} else {
				//月份不存在则赋值数组且将数据push进数组
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				] = [];
				result[new Date(item).getFullYear()][
					new Date(item).getMonth() + 1
				].push(data[i]);
			}
		}
	}
	return result;
}
//归档
router.get("/archive", async (ctx) => {
	let res = await Post.findAll({
		order: [
			//倒序排列updatedAt数据
			["publishedAt", "DESC"],
		],
		where: {
			post_status: 1,
		},
		attributes: [
			["post_title", "title"],
			["publishedAt", "publishedAt"],
			["id", "id"],
		],
		raw: true,
	});
	return (ctx.body = {
		result: true,
		data: formatData(res),
	});
});

//首页文章列表
router.get("/findPostList", async (ctx) => {
	let { page } = ctx.request.query;
	console.log(page);

	if (!page || isNaN(parseInt(page))) {
		return (ctx.body = {
			result: false,
			message: "请输入正确的字段或值！",
		});
	}
	let res = await Post.findAndCountAll({
		order: [
			//倒序排列updatedAt数据
			["publishedAt", "DESC"],
		],
		attributes: [
			["id", "postId"],
			["post_title", "title"],
			["post_describe", "describe"],
			["feature_image", "image"],
			["createdAt", "createdAt"],
			["publishedAt", "publishedAt"],
			["updatedAt", "last_modified_date"],
			["like_count", "like_count"],
			["pv", "pv"],
		],
		where: {
			post_status: 1,
		},
		offset: 10 * (page - 1),
		limit: 10,
		include: [
			{
				model: Category,
				attributes: ["name"],
			},
		],
	});

	return (ctx.body = {
		result: true,
		postList: res,
	});
});

//文章详情
router.get("/findPost", async (ctx) => {
	let postId = ctx.request.query.post_id,
		findRes = null,
		updatePv = 0;
	if (postId && !isNaN(parseInt(postId))) {
		findRes = await Post.findOne({
			attributes: [
				["id", "postId"],
				["post_author", "author"],
				["post_title", "postTitle"],
				["html_content", "htmlContent"],
				// ["post_describe", "postDescribe"],
				["feature_image", "coverImg"],
				["post_status", "postStatus"],
				["createdAt", "createdAt"],
				["pv", "pv"],
				["comment_status", "commentStatus"],
			],
			where: {
				id: postId,
			},
		});
		//非后台查询增加pv数
		updatePv = findRes.dataValues.pv;
		updatePv++;
		await Post.update(
			{
				pv: updatePv,
			},
			{
				where: {
					id: postId,
				},
			}
		);
	}
	if (findRes === null) {
		return (ctx.body = {
			result: false,
			message: "无数据！",
		});
	}
	return (ctx.body = {
		result: true,
		post: findRes,
	});
});

module.exports = router;
