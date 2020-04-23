const bcrypt = require("bcrypt");
const Ocorrencia = require("../models/Ocorrencia");
const NotificacaoController = require("../controllers/NotificacaoController");

module.exports = {
    async index(req, res) {
        const ocorrencias = await Ocorrencia.find();
        return res.status(200).json(ocorrencias);
    },

    async store(req, res) {
        const id = await Ocorrencia.countDocuments();

        const { id_user, latitude, longitude, tipo, description } = req.body; // isso aqui deve ser extraído do token
        const id_delegacia = 0; // isso aqui vai ser calculado

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const status = "Em aberto";
        const dateTimeStart = new Date();
        const dateTimeLastUpdate = new Date();

        const ocorrencia = await Ocorrencia.create({
            id,
            id_user,
            id_delegacia,
            description,
            tipo,
            location,
            status,
            dateTimeStart,
            dateTimeLastUpdate
        });

        await NotificacaoController.store(ocorrencia);
        return res.status(200).json(ocorrencia);
    },

    async show(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        const ocorrencia = await Ocorrencia.findOne({ id });

        if (ocorrencia) {
            return res.status(200).json(ocorrencia);
        } else {
            return res.status(200).json({ message: 'Occurrence not found' });
        }
    },

    async update(req, res) {
        const { id, status } = req.body; // Verificar se é melhor pegar este ID do Token

        let ocorrencia = await Ocorrencia.findOne({ id });
        let dateTimeLastUpdate = new Date();

        if (ocorrencia) {
            const { id_user, id_delegacia, tipo, location, dateTimeStart, description } = ocorrencia;
            await ocorrencia.updateOne({ status, dateTimeLastUpdate });
            return res.status(200).json({
                id,
                id_user,
                id_delegacia,
                description,
                tipo,
                location,
                status,
                dateTimeStart,
                dateTimeLastUpdate,
            });

        } else {
            return res.status(200).json({ message: 'Occurrence not found' });
        }
    },
}