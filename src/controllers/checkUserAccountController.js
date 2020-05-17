const generatedToken = require("../utils/generatedToken");
const configureTemplate = require("../utils/configureTemplate");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");
const Usuario = require("../models/Usuario");

module.exports = {
  async sendTokenCheckAccount({ name, email }) {
    const { token } = generatedToken();

    const transporter = nodemailer.createTransport(mailConfig);
    configureTemplate(transporter);

    transporter.sendMail({
      to: email,
      from: mailConfig.auth.user,
      subject: "Ativar conta!",
      template: 'activeAccount',
      context: {
        name,
        token
      }
    }, async (error) => {
      if (error) {
        throw "Houve um erro ao enviar email"
      }


      const usuario = await Usuario.findOne({
        email
      });

      if (!usuario) {
        throw "Usuario não encontrado"
      }

      await usuario.updateOne({
        checkAccounToken: token
      });

    });
  },

  async verifyAccount(req, res) {
    try {

      const { email, token } = req.body;
      const usuario = await Usuario.findOne({ email })
      .select('+checkAccounToken');

      if (!usuario) {
        return res.status(400).json({
          message: 'User not found'
        })
      }

      if (usuario.checkAccounToken != token) {

        console.log(usuario.checkAccounToken);
        console.log(token);

        return res.status(400).json({
          message: 'Token invalid'
        })
      }

      await usuario.updateOne({
        accountChecked: true
      });

      return res.json({
        message: 'Account activated!'
      });

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }


  }
}