const nodemailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");
const generatedToken = require("../utils/generatedToken");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

module.exports = {
    async forgotPassword(req, res) {

        try {
            const { email } = req.body;
            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }

            const { token, now } = generatedToken();

            await usuario.updateOne({
                passwordResetToken: token,
                passwordResetExpiresIn: now
            });

            const transporter = nodemailer.createTransport(mailConfig);

            transporter.sendMail({
                to: email,
                from: mailConfig.auth.user,
                subject: "Reset password",
                text: `Hello! your token ${token} and your expires ${now.toLocaleString('pt-BR')}`
            }, (error) => {
                if (error) {
                    return res.status(400).json({ error: error.message });
                }
                return res.status(200).json({ message: 'Okay' })
            });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async resetPassword(req, res) {
        try {
            const { email, token, password } = req.body;
            const usuario = await Usuario.findOne({ email })
                .select('+passwordResetToken passwordResetExpiresIn');

            if (!usuario) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }

            if (token !== usuario.passwordResetToken) {
                return res.status(400).json({ error: 'Token invalid' });
            }

            const now = new Date();

            if (now > usuario.passwordResetExpiresIn) {
                return res.status(400).json({ error: 'Token expired. Generate a new one.' });
            }

            const passwordCrypt = await bcrypt.hash(password, 8);
            await usuario.updateOne({ password: passwordCrypt });

            return res.status(200).json({ message: 'Password updated' });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}