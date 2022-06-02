require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./router");
const cookieParser = require("cookie-parser");
const error = require("./middlewares/error");
const blocked = require("./middlewares/blocked");
const cors = require("cors");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    preflightContinue: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(blocked);
app.use("/", router);
app.use(error);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("server started on port: " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
