const stokBarangRouter = require("./stokbarang");
const userRouter = require("./user");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/stokBarang", stokBarangRouter);

module.exports = router;
