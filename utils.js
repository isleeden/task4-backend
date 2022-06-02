const userDTO = (user) => {
  return {
    login: user.login,
    id: user.id,
    blocked: user.blocked,
  };
};

module.exports = {
  userDTO,
};
