const bcrypt = require("bcrypt");
const Delegacia = require("../models/Delegacia");

module.exports = {
    async index(req, res) {
        const delegacias = await Delegacia.find();
        return res.status(200).json(delegacias);
    },

    async store(req, res) {
        const { name, email, password, latitude, longitude } = req.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const id = await Delegacia.countDocuments();
        const active = true;

        const delegacia = await Delegacia.create({ id, name, email, password, location, active });

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
        const { id, name, email, password, latitude, longitude } = req.body; // Verificar se é melhor pegar este ID do Token

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