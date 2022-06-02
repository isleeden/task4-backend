const ApiError = require("../api-error");
const Token = require("../models/Token");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { userDTO } = require("../utils");

class TokenService {
  static saveToken = async (UserId, refreshToken) => {
    const tokenData = await Token.findOne({ where: { UserId } });
    if (tokenData) {
      await Token.update(
        { refreshToken },
        {
          where: {
            UserId,
          },
        }
      );
    } else {
      await Token.create({ refreshToken, UserId });
    }
    return refreshToken;
  };

  static refreshToken = async (refreshToken) => {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    return await TokenService.handleData(user);
  };

  static createTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  };

  static removeToken = async (refreshToken) => {
    const token = await TokenService.findToken(refreshToken);
    return await token.destroy();
  };

  static findToken = async (refreshToken) => {
    return await Token.findOne({ where: { refreshToken } });
  };

  static validateAccessToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS);
    } catch {
      return null;
    }
  };

  static validateRefreshToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH);
    } catch {
      return null;
    }
  };

  static handleData = async (user) => {
    const userDto = userDTO(user);
    const tokens = TokenService.createTokens(userDto);
    await TokenService.saveToken(user.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  };
}

module.exports = TokenService;
