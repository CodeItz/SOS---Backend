const { Router } = require('express');
const routes = Router();

const auth = require("./middlewares/auth");
const SessionControllerPoliceStation = require("./controllers/SessionPoliceStationController");
const SessionUserController = require("./controllers/SessionUserController");

const UsuarioController = require("./controllers/UsuarioController");
const DelegaciaController = require("./controllers/DelegaciaController");
const OcorrenciaController = require("./controllers/OcorrenciaController");
const NotificacaoController = require("./controllers/NotificacaoController");

const sessionValidate = require("./validations/SessionCreateValidation");

const validationCreatePoliceStation = require("./validations/DelegaciaCreateValidation");
const validationUpdatePoliceStation = require("./validations/DelegaciaUpdateValidation");

const validateCreateOccurence = require("./validations/OcorrenciaCreateValidation");
const validateUpdateOccurence = require("./validations/OcorrenciaUpdateValidation");

const validateCreateUser = require("./validations/UsuarioCreateValidation");
const validateUpdateUser = require("./validations/UsuarioUpdateValidation");

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Its works the new Backend 2" });
});

routes.post('/sessions/user', sessionValidate, SessionUserController.store);
routes.post('/sessions/policestation', sessionValidate, SessionControllerPoliceStation.store);

routes.post("/users/create", validateCreateUser, UsuarioController.store);
routes.post("/policestation/create", validationCreatePoliceStation, DelegaciaController.store);

routes.use(auth);

routes.get("/users", UsuarioController.index);
routes.get("/users/:id", UsuarioController.show);
routes.put("/users/update", validateUpdateUser, UsuarioController.update);
routes.delete("/users/delete/:id", UsuarioController.destroy);

routes.get("/policestation", DelegaciaController.index);
routes.get("/policestation/:id", DelegaciaController.show);
routes.put("/policestation/update", validationUpdatePoliceStation, DelegaciaController.update);
routes.delete("/policestation/delete/:id", DelegaciaController.destroy);

routes.get("/occurrence", OcorrenciaController.index);
routes.get("/occurrence/:id", OcorrenciaController.show);
routes.post("/occurrence/create", validateCreateOccurence, OcorrenciaController.store);
routes.put("/occurrence/update", validateUpdateOccurence, OcorrenciaController.update);

routes.get("/notifications", NotificacaoController.index);
routes.get("/notifications/:id", NotificacaoController.show);

module.exports = routes;