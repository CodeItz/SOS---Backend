const jwt = require("jsonwebtoken");
const authConfig = require("../config/authJWTConfig");


module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ error: 'Token not provided'})
    }

    const [_, token] = authHeader.split(" ");

    try {
        jwt.verify(token, authConfig.secret, (err, result) => {
            if(err){
                throw "Token invalid"
            }
            
            req.consumerId = result.id;

            return next();
        });
    } catch (error) {
        return res.status(401).json({error:'Token invalid'});
    }
};