const sequelize = require("../db");
const DataTypes = require("sequelize");
const Token = require("./Token");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasOne(Token, { onDelete: "cascade" });

module.exports = User;
