const Router = require("koa-router");
const {
	Post,
	mySequelize,
	Relationship,
	Category,
	Tag
} = require("../lib/orm_order");

const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = new Router({
	prefix: "/api"
});

let findOrCreate = async (op, t) => {
	return await Post.findOrCreate({
		where: {
			post_title: op.title
		},
		defaults: {
			post_author: op.author,
			post_content: op.content,
			post_describe: op.describe,
			feature_image: op.featureImage,
			post_status: op.status,
			comment_status: op.commentStatus,
			publish_date: new Date(),
			modification_date: new Date()
		},
		transaction: t
	});
};

router.post("/addAndUploadPost", async ctx => {
	let {
			id,
			author,
			title,
			content,
			describe,
			category,
			categoryUpdate,
			status,
			featureImage,
			commentStatus
		} = ctx.request.body,
		relationshipArr = [],
		postId = null;
	if (id && isNaN(parseInt(id))) {
		//id非数字类型时
		return (ctx.body = {
			result: false,
			message: "请输入正确的字段值！"
		});
	}

	if (!id) {
		//不存在id则插入数据
		await mySequelize.transaction(async t => {
			//递归查询标题是否存在
			async function titleFcn(titl) {
				let resCre = await findOrCreate(
					{
						author: author,
						title: titl ? titl : "not titile",
						content: content,
						describe: describe,
						status: status,
						featureImage: featureImage,
						commentStatus: commentStatus
					},
					t
				);
				if (!resCre[1]) {
					//标题已存在递归查询标题
					return await titleFcn(titl + "(新)");
				} else {
					return resCre;
				}
			}
			let postRes = await titleFcn(title);
			postId = postRes[0].dataValues.id;
			if (category && Array.isArray(category)) {
				for (let i in category) {
					relationshipArr[i] = {};
					relationshipArr[i].object_id = postId;
					relationshipArr[i].term_taxonomy_id = category[i];
				}
				await Relationship.bulkCreate(relationshipArr, {
					transaction: t
				});
			}
			return (ctx.body = {
				result: true,
				id: postId,
				postTitle: postRes[0].dataValues.post_title
			});
		});
	} else {
		//存在id则修改post内容
		await mySequelize.transaction(async t => {
			async function titleFcn(titl) {
				//递归函数，递归查询是否文章标题重复，更新不重复的标题
				let findRes = await Post.findOne({
					where: {
						post_title: titl,
						id: {
							[Op.ne]: id
						}
					}
				});
				if (findRes) {
					title = titl + "(新)";
					return await titleFcn(title);
				} else {
					return true;
				}
			}
			await titleFcn(title);

			let res = await Post.update(
				{
					post_author: author,
					post_title: title,
					post_content: content,
					post_describe: describe,
					post_status: status,
					feature_image: featureImage,
					comment_status: commentStatus,
					modification_date: new Date()
				},
				{
					where: {
						id: id
					},
					transaction: t
				}
			);
			if (res[0] === 0) {
				return (ctx.body = {
					result: false,
					message: "不存在该文章！"
				});
			}
			if (categoryUpdate) {
				//分类有更新
				await Relationship.destroy({
					where: {
						object_id: id
					},
					transaction: t
				});
				if (category && Array.isArray(category)) {
					for (let i in category) {
						relationshipArr[i] = {};
						relationshipArr[i].object_id = id;
						relationshipArr[i].term_taxonomy_id = category[i];
					}
					await Relationship.bulkCreate(relationshipArr, {
						transaction: t
					});
				}
			}
			return (ctx.body = {
				result: true,
				postTitle: title
			});
		});
	}
});

router.post("/findPost", async ctx => {
	let { postId } = ctx.request.body,
		findRes = null,
		category = null;
	if (postId) {
		findRes = await Post.findOne({
			attributes: [
				["id", "postId"],
				["post_author", "author"],
				["post_title", "postTitle"],
				["post_content", "editContent"],
				["post_describe", "postDescribe"],
				["feature_image", "coverImg"],
				["post_status", "postStatus"],
				["comment_status", "commentStatus"]
			],
			where: {
				id: postId
			}
		});
	}
	category = await Category.findAll({
		attributes: [
			["name", "cName"],
			["id", "cValue"]
		],
		include: [
			{
				model: Relationship,
				// where: {
				// 	object_id: postId
				// },
				attributes: [["object_id", "postId"]]
			}
		]
	});

	if (findRes === null) {
		//无结果只返回分类查询数据
		return (ctx.body = {
			result: true,
			category: category
		});
	}
	ctx.body = {
		result: true,
		post: findRes,
		category: category
	};
});

router.post("/findAllPost", async ctx => {
	return (ctx.body = {});
});

module.exports = router;
