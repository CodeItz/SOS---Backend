const bcrypt = require("bcrypt");

const Ocorrencia = require("../models/Ocorrencia");
const NotificacaoController = require("../controllers/NotificacaoController");

const calculatePoliceStationFromOcurrence = require("../utils/calculatePoliceStationFromOccurence");
const { filterConnection, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const { user, policestation } = req.query;
    const id = req.consumerId;

    let ocorrencias;

    if (user) {
      let id_user = id;
      ocorrencias = await Ocorrencia.find({ id_user });
    } else if (policestation) {
      let id_delegacia = id;
      ocorrencias = await Ocorrencia.find({ id_delegacia });
    } else {
      ocorrencias = await Ocorrencia.find();
    }

    return res.status(200).json(ocorrencias);
  },

  async store(req, res) {
    const id_user = req.consumerId;

    const id = await Ocorrencia.countDocuments();

    const {
      latitude,
      longitude,
      tipo,
      description,
      isArmed,
      howManyCriminals,
    } = req.body;
    const id_delegacia = await calculatePoliceStationFromOcurrence(
      latitude,
      longitude
    ); // isso aqui vai ser calculado

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

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
      dateTimeLastUpdate,
    });

    await NotificacaoController.store(ocorrencia);

    const sendSocket = filterConnection(id_delegacia);  

    console.log('O socket escolhido: ' + sendSocket);
    console.log(sendSocket);

    if (sendSocket) {
        sendMessage(sendSocket, 'newOcurrence', ocorrencia);
    }

    return res.status(200).json(ocorrencia);
  },

  async show(req, res) {
    const { id } = req.params; // Verificar se é melhor pegar este ID do Token

    const ocorrencia = await Ocorrencia.findOne({ id });

    if (ocorrencia) {
      return res.status(200).json(ocorrencia);
    } else {
      return res.status(200).json({ message: "Occurrence not found" });
    }
  },

  async update(req, res) {
    const { id, status } = req.body;

    let ocorrencia = await Ocorrencia.findOne({ id });

    if (ocorrencia) {
      let { id_delegacia } = ocorrencia;
      let dateTimeLastUpdate = new Date();

      if (!(req.consumerId == id_delegacia)) {
        return res.status(400).json({ Message: "Operation not permitted" });
      }

      const {
        id_user,
        tipo,
        location,
        dateTimeStart,
        description,
      } = ocorrencia;
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
      return res.status(200).json({ message: "Occurrence not found" });
    }
  },
};
