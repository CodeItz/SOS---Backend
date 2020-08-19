const Usuarios = require("../models/Usuario");
const Delegacia = require("../models/Delegacia");
const crypto = require("crypto");

module.exports = async function () {
  const id = crypto.randomBytes(6).toString("hex");

  return id;
};
