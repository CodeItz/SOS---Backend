const Delegacia = require("../models/Delegacia");
const authJWT = require("../config/authJWTConfig");
const ExpireIn = require("../config/expireInPoliceStation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req, res) {

        const { email, password } = req.body;

        const delegacia = await Delegacia.findOne({ email })
        .select('+accountChecked');

        if (!delegacia) {
            return res.status(401).json({ error: 'Police Station not found' });
        }

        if (!(await bcrypt.compare(password, delegacia.password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        if(!(delegacia.accountChecked)){
            return res.status(401).json({
                error: 'Active your account'
            })
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