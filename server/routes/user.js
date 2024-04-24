const Controller = require("../controllers/user");
const authentication = require("../middleware/authentication");

const userRouter = require("express").Router();

userRouter.get("/", authentication, Controller.getAll);
userRouter.get("/:id", authentication, Controller.getOne);
userRouter.post("/register", authentication, Controller.register);
userRouter.post("/login", authentication, Controller.login);
userRouter.patch("/:id", authentication, Controller.update);
userRouter.patch("/password/:id", authentication, Controller.updatePassword);
userRouter.patch("/telepon/:id", authentication, Controller.updateNomorTelepon);
userRouter.delete("/:id", authentication, Controller.delete);

module.exports = userRouter;
