const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

module.exports = {
    async index(req, res) {
        const users = await Usuario.find();
        return res.status(200).json(users);
    },

    async store(req, res) {
        const { name, email, password, cpf } = req.body;
        const id = await Usuario.countDocuments();
        const active = true;

        const user = await Usuario.create({ id, name, email, password, cpf, active });

        return res.status(200).json(user);
    }
}