const { Router } = require('express');
const routes = Router();

const UsuarioController = require("./controllers/UsuarioController");
const DelegaciaController = require("./controllers/DelegaciaController");
const OcorrenciaController = require("./controllers/OcorrenciaController");
const NotificacaoController = require("./controllers/NotificacaoController");

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
routes.get("/policestation/:id", DelegaciaController.show);
routes.put("/policestation/update", DelegaciaController.update);
routes.delete("/policestation/delete/:id", DelegaciaController.destroy);

routes.get("/occurrence", OcorrenciaController.index);
routes.get("/occurrence/:id", OcorrenciaController.show);
routes.post("/occurrence/create", OcorrenciaController.store);
routes.put("/occurrence/update", OcorrenciaController.update);

routes.get("/notifications", NotificacaoController.index);
routes.get("/notifications/:id", NotificacaoController.show);

module.exports = routes;