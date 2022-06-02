const User = require("../models/User");
const TokenService = require("./TokenService");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");

class UserService {
  static registration = async (login, password) => {
    if (!login || !password) {
      throw ApiError.BadRequest("incorrect data");
    }
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.BadRequest("user with this login exist");
    }
    const hashPassword = await bcrypt.hash(password, 1);
    const user = await User.create({ login, password: hashPassword });
    return await TokenService.handleData(user);
  };

  static login = async (login, password) => {
    if (!login || !password) {
      throw ApiError.BadRequest("incorrect data");
    }
    const user = await User.findOne({ where: { login } });
    if (!user) {
      throw ApiError.BadRequest("user with this login not exist");
    }
    if (user.blocked) {
      throw ApiError.AccessDenied();
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw ApiError.BadRequest("incorrect data");
    }
    return await TokenService.handleData(user);
  };

  static logout = async (refreshToken) => {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  };

  static getUsers = async () => {
    return await User.findAll();
  };

  static blockUsers = async (ids) => {
    User.update({ blocked: true }, { where: { id: ids } });
  };

  static unblockUsers = async (ids) => {
    User.update({ blocked: false }, { where: { id: ids } });
  };

  static removeUsers = async (ids) => {
    User.destroy({ where: { id: ids } });
  };
}

module.exports = UserService;
