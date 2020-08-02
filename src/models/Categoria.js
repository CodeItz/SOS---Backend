const moongose = require("mongoose");

const Categoria = moongose.Schema({
    categoria: {
        type: String,
        required: true
    },
});

module.exports = moongose.model('Categoria', Categoria);