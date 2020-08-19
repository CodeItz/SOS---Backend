const configureTemplate = require("../utils/configureTemplate");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");
const Delegacia = require("../models/Delegacia");

module.exports = {
  async sendTokenCheckAccount({ name, email, checkAccounToken }) {
    const token = checkAccounToken;

    console.log("TOKEN");
    console.log(token);

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


      const delegacia = await Delegacia.findOne({
        email
      });

      if (!delegacia) {
        throw "Delegacia não encontrado"
      }

      await Delegacia.updateOne({
        checkAccounToken: token
      });

    });
  },

  async verifyAccount(req, res) {
    try {

      const { email, token } = req.body;
      const delegacia = await Delegacia.findOne({ email })
      .select('+checkAccounToken');

      if (!delegacia) {
        return res.status(400).json({
          message: 'Delegacia not found'
        })
      }

      if (delegacia.checkAccounToken != token) {

        console.log(delegacia.checkAccounToken);
        console.log(token);

        return res.status(400).json({
          message: 'Token invalid'
        })
      }

      await delegacia.updateOne({
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