const Controller = require("../controllers/stokBarang");
const authentication = require("../middleware/authentication");

const inventoryRouter = require("express").Router();

inventoryRouter.get("/", authentication, Controller.getAll);
inventoryRouter.get("/:id", authentication, Controller.getOne);
inventoryRouter.post("/", authentication, Controller.create);
inventoryRouter.patch("/:id", authentication, Controller.update);
inventoryRouter.patch("/add/:id", authentication, Controller.addingStock);
inventoryRouter.patch("/reduce/:id", authentication, Controller.reduceStock);
inventoryRouter.delete("/:id", authentication, Controller.delete);

module.exports = inventoryRouter;
