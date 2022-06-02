const Router = require("express");
const Controller = require("./controller");
const authMiddleware = require("./middlewares/auth");
const router = new Router();

router.post("/registration", Controller.registration);
router.post("/login", Controller.login);
router.post("/logout", Controller.logout);
router.post("/refresh", Controller.refreshToken);

router.get("/users", authMiddleware, Controller.getUsers);
router.patch("/users/block", authMiddleware, Controller.blockUsers);
router.patch("/users/unblock", authMiddleware, Controller.unblockUsers);
router.delete("/users/remove", authMiddleware, Controller.removeUsers);

module.exports = router;
