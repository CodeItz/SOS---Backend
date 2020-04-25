const bcrypt = require("bcrypt");
const Delegacia = require("../models/Delegacia");
const DelegaciaCreateValidation = require("../validations/DelegaciaCreateValidation");
const DelegaciaUpdateValidation = require("../validations/DelegaciaUpdateValidation");

module.exports = {
    async index(req, res) {
        const delegacias = await Delegacia.find();
        return res.status(200).json(delegacias);
    },

    async store(req, res) {

        if(! (await DelegaciaCreateValidation.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const { name, email, password, latitude, longitude } = req.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const id = await Delegacia.countDocuments();
        const active = true;

        const passwordCrypt = await bcrypt.hash(password, 8);

        const delegacia = await Delegacia.create({ id, name, email, password: passwordCrypt, location, active });

        return res.status(200).json(delegacia);
    },

    async show(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        const delegacia = await Delegacia.findOne({ id });

        if (delegacia) {
            return res.status(200).json(delegacia);
        } else {
            return res.status(200).json({ message: 'Police Station not found' });
        }
    },

    async update(req, res) {

        if(! (await DelegaciaUpdateValidation.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const id = 0; // Buscar do token

        const { name, email, password, latitude, longitude } = req.body; 

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        let delegacia = await Delegacia.findOne({ id });

        if (delegacia) {
            await delegacia.updateOne({ id, name, email, password, location});
            return res.status(200).json({
                id,
                name,
                email,
                password,
                location
            });
        } else {
            return res.status(200).json({ message: 'Delegacia not found' });
        }

    },

    async destroy(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        let delegacia = await Delegacia.findOne({ id });

        if (delegacia) {
            delegacia = await delegacia.updateOne({ $set: { active: false } });
            return res.status(200).json({ message: 'Delegacia deleted' });
        } else {
            return res.status(200).json({ message: 'Delegacia not found' });
        }
    }
}