const moongose = require("mongoose");

const Notificacao = moongose.Schema({
    id: Number,
    id_user:Number,
    id_delegacia:Number,
    description:String,
    tipo:String,
    dateTime:Date,
    visualized:Boolean
});

module.exports = moongose.model('Notificacao', Notificacao);