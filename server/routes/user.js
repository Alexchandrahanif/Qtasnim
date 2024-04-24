const Controller = require("../controllers/user");
const authentication = require("../middleware/authentication");

const userRouter = require("express").Router();

userRouter.post("/register", Controller.register);
userRouter.post("/login", Controller.login);
userRouter.get("/", authentication, Controller.getAll);
userRouter.get("/:id", authentication, Controller.getOne);
userRouter.patch("/:id", authentication, Controller.update);
userRouter.patch("/password/:id", authentication, Controller.updatePassword);
userRouter.patch("/telepon/:id", authentication, Controller.updateNomorTelepon);
userRouter.delete("/:id", authentication, Controller.delete);

module.exports = userRouter;
