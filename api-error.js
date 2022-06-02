module.exports = class ApiError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized");
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static AccessDenied() {
    return new ApiError(403, "Access Denied");
  }
};
