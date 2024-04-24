const inventoryRouter = require("./inventory");
const userRouter = require("./user");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/inventory", inventoryRouter);
module.exports = router;
