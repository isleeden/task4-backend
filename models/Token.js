const sequelize = require("../db");
const DataTypes = require("sequelize");

const Token = sequelize.define("Token", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});


module.exports = Token;
