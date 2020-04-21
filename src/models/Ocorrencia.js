const mongoose = require("mongoose");

const Ocorrencia = mongoose.Schema({
    id: Number,
    id_user: Number,
    id_delegacia: Number,
    tipo: String,
    status: String,
    dataHoraInicio: Date,
    dataHoraUltimaAtualizacao: Date,
});

module.exports = mongoose.model('Ocorrencia', Ocorrencia);