const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const UserCreate = require("../validations/UsuarioCreateValidation");
const UserUpdate = require("../validations/UsuarioUpdateValidation");

module.exports = {
    async index(req, res) {
        const users = await Usuario.find();
        return res.status(200).json(users);
    },

    async store(req, res) {

        if(! (await UserCreate.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const { name, email, password, cpf, birthday } = req.body;

        const id = await Usuario.countDocuments();
        const active = true;
        const passwordCrypt = await bcrypt.hash(password, 8);

        const user = await Usuario.create({ id, name, birthday, email, password: passwordCrypt, cpf, active });

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
        
        if(! (await UserUpdate.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const id = req.consumerId;

        const { name, email, password } = req.body; 
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

        if(! (req.consumerId == id)){
            return res.status(400).json({Message: 'Operation not permitted'});
        }

        if (user) {
            user = await user.updateOne({ $set: { active: false } });
            return res.status(200).json({ message: 'User deleted' });
        } else {
            return res.status(200).json({ message: 'User not found' });
        }
    }
}