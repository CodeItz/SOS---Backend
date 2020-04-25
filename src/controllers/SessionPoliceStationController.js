const SessionValidation = require("../validations/SessionCreateValidation");
const Delegacia = require("../models/Delegacia");
const authJWT = require("../config/authJWTConfig");
const ExpireIn = require("../config/expireInPoliceStation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req, res) {

        if (!(await SessionValidation.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fail, please info email and password' });
        }

        const { email, password } = req.body;

        const delegacia = await Delegacia.findOne({ email });

        if (!delegacia) {
            return res.status(401).json({ error: 'Police Station not found' });
        }

        if (!(await bcrypt.compare(password, delegacia.password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = delegacia;

        return res.json({
            delegacia: {
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