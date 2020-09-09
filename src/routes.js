
const { Router } = require("express");

var mongoose = require("mongoose");
var ExpressBrute = require("express-brute");
var MongooseStore = require("express-brute-mongoose");
var BruteForceSchema = require("express-brute-mongoose/dist/schema");

const routes = Router();


const auth = require("./middlewares/auth");
const SessionControllerPoliceStation = require("./controllers/SessionPoliceStationController");
const SessionUserController = require("./controllers/SessionUserController");

const UsuarioController = require("./controllers/UsuarioController");
const DelegaciaController = require("./controllers/DelegaciaController");
const OcorrenciaController = require("./controllers/OcorrenciaController");
const NotificacaoController = require("./controllers/NotificacaoController");
const UserResetPasswordController = require("./controllers/UserResetPasswordController");
const PoliceResetPasswordController = require("./controllers/PoliceResetPasswordController");
const NewToken = require("./controllers/sendNewToken");
const CategoriaController = require("./controllers/CategoriaController");

const AvaliacaoController = require("./controllers/AvaliacaoController");


const sessionValidate = require("./validations/SessionCreateValidation");

const validationCreatePoliceStation = require("./validations/DelegaciaCreateValidation");
const validationUpdatePoliceStation = require("./validations/DelegaciaUpdateValidation");

const validateCreateOccurence = require("./validations/OcorrenciaCreateValidation");
const validateUpdateOccurence = require("./validations/OcorrenciaUpdateValidation");

const validateCreateUser = require("./validations/UsuarioCreateValidation");
const validateUpdateUser = require("./validations/UsuarioUpdateValidation");

const validateCreateAvaliacao = require("./validations/AvaliacaoValidation");

const validateCheckAccount = require("./validations/CheckAccountValidation");

const forgotPassword = require("./validations/ForgotPasswordValidation");
const resetPassword = require("./validations/ResetPasswordValidation");

const newToken = require("./validations/NewToken");
const categoria = require("./validations/CategoriaCreate");

const checkUserAccountController = require("./controllers/checkUserAccountController");
const checkPoliceAccountController = require("./controllers/checkPoliceStationAccountController");


var model = mongoose.model("bruteforce", new mongoose.Schema(BruteForceSchema));
var store = new MongooseStore(model);
 
var bruteforce = new ExpressBrute(store);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Its works the new Backend!" });
});


routes.post("/sessions/user", bruteforce.prevent, sessionValidate, SessionUserController.store);
routes.post(
  "/sessions/policestation",
  sessionValidate,
  SessionControllerPoliceStation.store
);

routes.post("/users/create", bruteforce.prevent, validateCreateUser, UsuarioController.store);
routes.post(
  "/policestation/create",
  validationCreatePoliceStation,
  DelegaciaController.store
);

routes.post(
  "/user/forgotPassword",
  bruteforce.prevent,
  forgotPassword,
  UserResetPasswordController.forgotPassword
);
routes.post(
  "/user/resetPassword",
  bruteforce.prevent, 
  resetPassword,
  UserResetPasswordController.resetPassword
);

routes.post(
  "/policestation/forgotPassword",
  bruteforce.prevent, 
  forgotPassword,
  PoliceResetPasswordController.forgotPassword
);
routes.post(
  "/policestation/resetPassword",
  bruteforce.prevent, 
  resetPassword,
  PoliceResetPasswordController.resetPassword
);

routes.post(
  "/activate/user",
  bruteforce.prevent, 
  validateCheckAccount,
  checkUserAccountController.verifyAccount
);
routes.post(
  "/activate/police",
  bruteforce.prevent,
  validateCheckAccount,
  checkPoliceAccountController.verifyAccount
);

routes.post(
  "/policestation/sendNewToken",
  bruteforce.prevent,
  newToken,
  NewToken.sendTokenCheckAccountPoliceStation
);
routes.post("/user/sendNewToken", bruteforce.prevent, newToken, NewToken.sendTokenCheckAccount);

routes.use(auth);

routes.get("/users", UsuarioController.index);
routes.get("/users/:id", UsuarioController.show);
routes.put("/users/update", bruteforce.prevent, validateUpdateUser, UsuarioController.update);
routes.delete("/users/delete/:id", bruteforce.prevent, UsuarioController.destroy);

routes.get("/policestation", DelegaciaController.index);
routes.get("/policestation/:id", DelegaciaController.show);
routes.put(
  "/policestation/update",
  bruteforce.prevent,
  validationUpdatePoliceStation,
  DelegaciaController.update
);
routes.delete("/policestation/delete/:id", bruteforce.prevent, DelegaciaController.destroy);

routes.get("/occurrence", OcorrenciaController.index);
routes.get("/occurrence/:id", OcorrenciaController.show);
routes.post(
  "/occurrence/create",
  bruteforce.prevent, 
  validateCreateOccurence,
  OcorrenciaController.store
);
routes.put(
  "/occurrence/update",
  bruteforce.prevent,
  validateUpdateOccurence,
  OcorrenciaController.update
);

routes.get("/notifications", NotificacaoController.index);
routes.get("/notifications/:id", NotificacaoController.show);

routes.get("/categoria", CategoriaController.index);
routes.post("/categoria", bruteforce.prevent, categoria, CategoriaController.store);

routes.post("/avaliation", bruteforce.prevent, validateCreateAvaliacao, AvaliacaoController.store);

module.exports = routes;
