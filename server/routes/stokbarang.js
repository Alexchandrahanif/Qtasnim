const Controller = require("../controllers/stokBarang");
const authentication = require("../middleware/authentication");
const stokBarangRouter = require("express").Router();

stokBarangRouter.get("/", authentication, Controller.getAll);
stokBarangRouter.get("/:id", authentication, Controller.getOne);
stokBarangRouter.post("/", authentication, Controller.create);
stokBarangRouter.patch("/:id", authentication, Controller.update);
stokBarangRouter.patch("/add/:id", authentication, Controller.addingStock);
stokBarangRouter.patch("/reduce/:id", authentication, Controller.reduceStock);
stokBarangRouter.delete("/:id", authentication, Controller.delete);

module.exports = stokBarangRouter;
