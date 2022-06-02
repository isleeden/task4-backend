const ApiError = require("../api-error");
const User = require("../models/User");
const TokenService = require("../services/TokenService");

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const accessToken = authHeader.split(" ")[1];
      if (accessToken) {
        const userData = TokenService.validateAccessToken(accessToken);
        if (userData) {
          const user = await User.findByPk(userData.id);
          if (user) {
            if (user.blocked) {
              throw ApiError.AccessDenied();
            }
          }
        }
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};
