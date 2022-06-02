const ApiError = require("../api-error");
const TokenService = require("../services/TokenService");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw ApiError.UnauthorizedError();
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    req.user = userData;
    next();
  } catch (e) {
    next(e);
  }
};
