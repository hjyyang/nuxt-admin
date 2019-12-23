const Sequelize = require("sequelize");
const config = require("./config");

var sequelize = new Sequelize(
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
		freezeTableName: true
	}
);

var dataTables = {};
dataTables.mySequelize = sequelize;

var User = sequelize.define(
	"user",
	{
		//user是表名，会在后面自动加上s（users）
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: Sequelize.STRING(32),
		password: Sequelize.STRING(32),
		email: Sequelize.STRING(32),
		WeChat: Sequelize.STRING(32)
	},
	{
		timestamps: false
	}
);

dataTables.User = User;

module.exports = dataTables;
