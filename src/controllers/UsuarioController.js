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
    },

    async show(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        const user = await Usuario.findOne({ id });

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(200).json({ message: 'User not found' });
        }
    },

    async update(req, res) {
        const { id, name, email, password } = req.body; // Verificar se é melhor pegar este ID do Token
        let user = await Usuario.findOne({ id });

        if (user) {
            await user.updateOne({ id, name, email, password });
            const { cpf, active } = user;
            return res.status(200).json({
                id,
                name,
                email,
                password,
                cpf,
                active
            });
        } else {
            return res.status(200).json({message: 'User not found'});
        }

    },

    async destroy(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        let user = await Usuario.findOne({ id });

        if (user) {
            user = await user.updateOne({ $set: { active: false } });
            return res.status(200).json({ message: 'User deleted' });
        } else {
            return res.status(200).json({ message: 'User not found' });
        }
    }
}