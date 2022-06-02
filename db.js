const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(process.env.DB_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
