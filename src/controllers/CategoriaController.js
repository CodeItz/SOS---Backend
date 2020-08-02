const bcrypt = require("bcrypt");
const Categoria = require("../models/Categoria");

module.exports = {
  async index(req, res) {
    const categorias = await Categoria.find();
    return res.status(200).json(categorias);
  },

  async store(req, res) {
    const { categoria } = req.body;

    const alreadyExists = await Categoria.findOne({categoria});

    if(alreadyExists){
      res.json({
        error: 'Categoria ja existe'
      });
    }

    await Categoria.create({
      categoria
    });

    return res.status(200).json({
      categoria
    });
  },
};
