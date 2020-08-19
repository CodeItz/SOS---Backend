const Usuarios = require("../models/Usuario");
const Delegacia = require("../models/Delegacia");
const token = crypto.randomBytes(4).toString("hex");

module.exports = async function () {
  const id = crypto.randomBytes(6).toString("hex");

  return id;
};
