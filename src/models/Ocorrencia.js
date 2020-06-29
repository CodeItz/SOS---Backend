const mongoose = require("mongoose");
const PointSchema = require("../utils/PointSchema");

const Ocorrencia = mongoose.Schema({
    id: Number,
    id_user: Number,
    id_delegacia: Number,
    isArmed: String,
    howManyCriminals:String,
    description:String,
    tipo: String,
    location:{
        type:PointSchema,
        index:'2dsphere'
    },
    status: String,
    dateTimeStart: Date,
    dateTimeLastUpdate: Date,
});

module.exports = mongoose.model('Ocorrencia', Ocorrencia);