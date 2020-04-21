const { Router } = require('express');
const routes = Router();

const UsuarioController = require("./controllers/UsuarioController");

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Its works" });
});

routes.get("/users", UsuarioController.index);
routes.post("/create/users", UsuarioController.store);

module.exports = routes;