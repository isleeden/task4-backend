const TokenService = require("./services/TokenService");
const UserService = require("./services/UserService");

class Controller {
  static registration = async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const userData = await UserService.registration(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  static logout = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (e) {
      next(e);
    }
  };

  static refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      const userData = await TokenService.refreshToken(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  static getUsers = async (req, res) => {
    const users = await UserService.getUsers();
    res.json({ users });
  };

  static blockUsers = async (req, res) => {
    const { ids } = req.body;
    await UserService.blockUsers(ids);
    res.json({ message: "blocked" });
  };

  static unblockUsers = async (req, res) => {
    const { ids } = req.body;
    await UserService.unblockUsers(ids);
    res.json({ message: "ublocked" });
  };

  static removeUsers = async (req, res) => {
    const { ids } = req.body;
    console.log(ids);
    await UserService.removeUsers(ids);
    res.json({ message: "performed" });
  };
}

module.exports = Controller;
