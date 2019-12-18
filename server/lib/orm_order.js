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
console.log(sequelize);

module.exports = dataTables;
