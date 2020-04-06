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
	prefix: "/api",
});

router.get("/searchSite", async (ctx) => {
	return (ctx.body = {});
});

//时间格式化数据结构函数
function formatData(data){
    let result = {};
    for(let i in data){
        let item = data[i].publishedAt;
        if(result[new Date(item).getFullYear()]){
            //判断对象内年份是否存在
            if(result[new Date(item).getFullYear()][new Date(item).getMonth()+1]){
                //判断对象内月份是否存在
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1].push(data[i]);
            }else{
                //月份不存在则赋值数组且将数据push进数组
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1] = [];
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1].push(data[i]);
            }
        }else{
            //年份不存在则赋值对象
            result[new Date(item).getFullYear()] = {};
            if(result[new Date(item).getFullYear()][new Date(item).getMonth()+1]){
                //判断对象内月份是否存在
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1].push(data[i]);
            }else{
                //月份不存在则赋值数组且将数据push进数组
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1] = [];
                result[new Date(item).getFullYear()][new Date(item).getMonth()+1].push(data[i]);
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

module.exports = router;
