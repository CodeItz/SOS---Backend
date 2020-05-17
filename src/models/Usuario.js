const moongose = require("mongoose");
const bcrypt = require("bcrypt");

const Usuario = moongose.Schema({
    id: Number,
    name: String,
    birthday: Date,
    email: String,
    password: {
        type: String,
        select: true
    },
    cpf: {
        type: String,
        select: false
    },
    active: {
        type: Boolean,
        select: false
    },
    accountChecked:{
        type:Boolean,
        select: false
    },
    checkAccounToken: {
        type: String,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpiresIn: {
        type: Date,
        select: false
    }
});

// Existem middlewares para mongo também, como depois de salvar, depois de atualizar e etc
module.exports = moongose.model('Usuario', Usuario);