const bcrypt = require("bcrypt");

const OcorrenciaCreate = require("../validations/OcorrenciaCreateValidation");
const OcorrenciaUpdateValidation = require("../validations/OcorrenciaUpdateValidation");

const Ocorrencia = require("../models/Ocorrencia");
const NotificacaoController = require("../controllers/NotificacaoController");

const calculatePoliceStationFromOcurrence = require("../utils/calculatePoliceStationFromOccurence");

module.exports = {
    async index(req, res) {
        const id_delegacia = req.consumerId;

        const ocorrencias = await Ocorrencia.find({ id_delegacia });

        return res.status(200).json(ocorrencias);
    },

    async store(req, res) {

        if (!(await OcorrenciaCreate.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const id_user = req.consumerId;

        const id = await Ocorrencia.countDocuments();

        const { latitude, longitude, tipo, description, isArmed, howManyCriminals } = req.body;
        const id_delegacia = await calculatePoliceStationFromOcurrence(latitude, longitude); // isso aqui vai ser calculado

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
            isArmed,
            howManyCriminals,
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

        if (!(await OcorrenciaUpdateValidation.isValid(req.body))) {
            return res.status(400).json({ error: 'Make sure your data is correct' });
        }

        const { id, status } = req.body;

        let ocorrencia = await Ocorrencia.findOne({ id });
        let { id_delegacia } = ocorrencia;
        let dateTimeLastUpdate = new Date();

        if (!(req.consumerId == id_delegacia)) {
            return res.status(400).json({ Message: 'Operation not permitted' });
        }

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