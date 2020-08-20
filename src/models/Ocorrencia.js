const mongoose = require("mongoose");
const PointSchema = require("../utils/PointSchema");

const Ocorrencia = mongoose.Schema({
  id: Number,
  id_user: Number,
  id_delegacia: Number,
  avaliation: {
    type: Number,
    default: 0
  },
  comment: {
    type: String,
    default: "Não enviado"
  },
  isArmed: {
    type: String,
    default: "Não preenchido",
  },
  howManyCriminals: {
    type: String,
    default: "Não preenchido",
  },
  description: {
    type: String,
    default: "Não preenchido",
  },
  tipo: {
    type: String,
    default: "Não preenchido",
  },
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
  status: {
    type: String,
  },
  dateTimeStart: Date,
  dateTimeLastUpdate: Date,
});

module.exports = mongoose.model("Ocorrencia", Ocorrencia);
