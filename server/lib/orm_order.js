const Sequelize = require("sequelize");
const config = require("./config");

let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			idle: 30000
		},
		timezone: "+08:00"
	}
);

let dataTables = {};
dataTables.mySequelize = sequelize;

let User = sequelize.define(
	"user",
	{
		//user是表名，会在后面自动加上s（users）
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: Sequelize.STRING,
		password: Sequelize.STRING,
		email: {
			type: Sequelize.STRING
		},
		WeChat: Sequelize.STRING,
		join_date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		role: Sequelize.TINYINT(10)
	},
	{
		timestamps: false
		//Sequelize默认为每个模型定义了字段id(主键),createdAt和updatedAt,
		//timestamps 为 false,因此不会创建 `createdAt` 和 `updatedAt` 字段.
		// freezeTableName: true
		//Sequelize默认情况下,表名自动复数,通过使用 freezeTableName:true 参数可以为特定模型停止此行为
	}
);

dataTables.User = User;

let Post = sequelize.define(
	"post",
	{
		id: {
			type: Sequelize.BIGINT(20),
			primaryKey: true,
			autoIncrement: true
		},
		post_author: {
			type: Sequelize.BIGINT(20),
			defaultValue: 1
		},
		post_title: {
			type: Sequelize.STRING,
			defaultValue: "not title"
		},
		post_content: {
			type: Sequelize.TEXT
		},
		post_describe: {
			type: Sequelize.STRING
		},
		publish_date: {
			type: Sequelize.DATE
		},
		modification_date: {
			type: Sequelize.DATE
		},
		post_status: {
			type: Sequelize.INTEGER(10)
		},
		like_count: {
			type: Sequelize.INTEGER(20)
		},
		pv: {
			type: Sequelize.INTEGER(20)
		},
		feature_image: {
			type: Sequelize.STRING
		},
		comment_count: {
			type: Sequelize.BIGINT(20)
		},
		comment_status: {
			type: Sequelize.STRING(20)
		}
	},
	{
		timestamps: false
	}
);

dataTables.Post = Post;

let Relationship = sequelize.define(
	"term_relationship",
	{
		object_id: {
			type: Sequelize.BIGINT,
			defaultValue: 0,
			primaryKey: true
		},
		term_taxonomy_id: {
			type: Sequelize.BIGINT,
			defaultValue: 0,
			primaryKey: true
		},
		term_order: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	},
	{
		timestamps: false
	}
);

dataTables.Relationship = Relationship;

module.exports = dataTables;
