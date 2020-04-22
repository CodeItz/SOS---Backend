const { Router } = require('express');
const routes = Router();

const UsuarioController = require("./controllers/UsuarioController");
const DelegaciaController = require("./controllers/DelegaciaController");

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Its works" });
});

routes.post("/users/create", UsuarioController.store);

routes.get("/users", UsuarioController.index);
routes.get("/users/:id", UsuarioController.show);
routes.put("/users/update", UsuarioController.update);
routes.delete("/users/delete/:id", UsuarioController.destroy);

routes.post("/policestation/create", DelegaciaController.store);
routes.get("/policestation", DelegaciaController.index);

module.exports = routes;