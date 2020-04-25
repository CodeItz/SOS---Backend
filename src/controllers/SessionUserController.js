const SessionValidation = require("../validations/SessionCreateValidation");
const Usuario = require("../models/Usuario");
const authJWT = require("../config/authJWTConfig");
const ExpireIn = require("../config/expireInUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req, res) {

        if (!(await SessionValidation.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fail, please info email and password' });
        }

        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (!(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = usuario;

        return res.json({
            usuario: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authJWT.secret, {
                expiresIn: ExpireIn.expiresIn
            }),
        })
    }
}