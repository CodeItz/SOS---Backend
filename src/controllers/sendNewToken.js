const generatedToken = require("../utils/generatedToken");
const configureTemplate = require("../utils/configureTemplate");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");
const Delegacia = require("../models/Delegacia");
const Usuario = require("../models/Usuario");

module.exports = {
  async sendTokenCheckAccountPoliceStation(req, res) {
    try {
      const { email } = req.body;

      const { name } = await Delegacia.findOne({ email });

      const { token } = generatedToken();

      const transporter = nodemailer.createTransport(mailConfig);
      configureTemplate(transporter);

      transporter.sendMail(
        {
          to: email,
          from: mailConfig.auth.user,
          subject: "Ativar conta!",
          template: "activeAccount",
          context: {
            name,
            token,
          },
        },
        async (error) => {
          if (error) {
            throw "Houve um erro ao enviar email";
          }

          const delegacia = await Delegacia.findOne({
            email,
          });

          if (!delegacia) {
            throw "Delegacia não encontrado";
          }

          await Delegacia.updateOne({
            checkAccounToken: token,
          });

          res.json({
            message: "Token enviado com sucesso",
          });
        }
      );
    } catch (error) {
      res.json(error);
    }
  },
  async sendTokenCheckAccount(req, res) {
    try {
      const { token } = generatedToken();

      const { email } = req.body;

      const { name } = await Usuario.findOne({ email });

      const transporter = nodemailer.createTransport(mailConfig);
      configureTemplate(transporter);

      transporter.sendMail(
        {
          to: email,
          from: mailConfig.auth.user,
          subject: "Ativar conta!",
          template: "activeAccount",
          context: {
            name,
            token,
          },
        },
        async (error) => {
          if (error) {
            console.dir(error);

            throw "Houve um erro ao enviar email";
          }

          const usuario = await Usuario.findOne({
            email,
          });

          if (!usuario) {
            throw "Usuario não encontrado";
          }

          await usuario.updateOne({
            checkAccounToken: token,
          });

          res.json({
            message: "Token enviado com sucesso",
          });
        }
      );
    } catch (error) {
      res.json(error);
    }
  },
};
