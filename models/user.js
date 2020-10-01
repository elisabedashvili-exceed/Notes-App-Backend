const Sequelize = require("sequelize");

const connection = new Sequelize("notes", "vakho", "vakho", {
  host: "localhost",
  dialect: "postgres",
  timezone: "+04:00",
});

const User = connection.define("user", {
  username: { type: Sequelize.TEXT, allowNull: false, unique: true },
  password: { type: Sequelize.TEXT, allowNull: false },
});

connection.sync();

exports.User = User;
