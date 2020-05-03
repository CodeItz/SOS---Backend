const moongose = require("mongoose");

const Usuario = moongose.Schema({
    id:Number,
    name:String,
    birthday: Date,
    email:String,
    password:String,
    cpf:String,
    active:Boolean
});

module.exports = moongose.model('Usuario', Usuario);