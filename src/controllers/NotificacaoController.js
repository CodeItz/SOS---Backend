const Notificacao = require("../models/Notificacao");

module.exports = {
    async index(req, res) {
        const notificacao = await Notificacao.find();
        return res.status(200).json(notificacao);
    },

    async store({id_user, id_delegacia, description, tipo}) {
        const id = await Notificacao.countDocuments();

        const visualized = false;
        const dateTime = new Date();

        const notificacao = await Notificacao.create({
            id,
            id_user,
            id_delegacia,
            description,
            tipo,
            dateTime,
            visualized
        })

        return notificacao;
    },

    async show(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        const notificacao = await Notificacao.findOne({ id });

        if (notificacao) {
            return res.status(200).json(notificacao);
        } else {
            return res.status(200).json({ message: 'Notification not found' });
        }
    },

}