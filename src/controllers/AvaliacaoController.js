const bcrypt = require("bcrypt");
const Ocorrencia = require("../models/Ocorrencia");

module.exports = {
  async store(req, res) {
    const { id_ocorrencia, comment, avaliation } = req.body;

    const id_user = req.consumerId;

    const occurrence = await Ocorrencia.findOne({ id: id_ocorrencia, id_user });

    if (!occurrence) {
      return res.json({
        error: "Ocorrencia não encontrada",
      });
    }

    await occurrence.updateOne({
      avaliation,
      comment
    });

    return res.status(200).json({
      message: "Its be update",
    });
  },
};
