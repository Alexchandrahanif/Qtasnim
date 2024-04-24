const inventoryRouter = require("./stokbarang");
const userRouter = require("./user");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/inventory", inventoryRouteruter);
module.exports = router;
