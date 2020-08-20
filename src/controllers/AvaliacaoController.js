const bcrypt = require("bcrypt");
const Ocorrencia = require("../models/Ocorrencia");

module.exports = {
  async store(req, res) {
    const { id_ocorrencia, avaliation } = req.body;

    const id_user = req.consumerId;

    const occurrence = await Ocorrencia.findOne({ id: id_ocorrencia, id_user });

    if (!occurrence) {
      res.json({
        error: "Ocorrencia não encontrada",
      });
    }

    await occurrence.updateOne({
      avaliation,
    });

    return res.status(200).json({
      message: "Its be update",
    });
  },
};
