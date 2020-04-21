const moongose = require("mongoose");

const Notificacao = moongose.Schema({
    id: Number,
    id_user:Number,
    id_delegacia:Number,
    dateTime:Date,
    visualized:Boolean
});

module.exports = moongose.model('Notificacao', Notificacao);