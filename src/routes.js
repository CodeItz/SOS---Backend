const { Router } = require('express');
const routes = Router();

const UsuarioController = require("./controllers/UsuarioController");

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Its works" });
});


routes.get("/users", UsuarioController.index);
routes.get("/users/:id", UsuarioController.show);
routes.post("/users/create", UsuarioController.store);
routes.put("/users/update", UsuarioController.update);
routes.delete("/users/delete/:id", UsuarioController.destroy);

module.exports = routes;