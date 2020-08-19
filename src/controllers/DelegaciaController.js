const bcrypt = require("bcrypt");
const Delegacia = require("../models/Delegacia");
const getId = require("../utils/calculateId");
const accountActive = require("../controllers/checkPoliceStationAccountController");
const generatedToken = require("../utils/generatedToken");

module.exports = {
    async index(req, res) {
        const delegacias = await Delegacia.find();
        return res.status(200).json(delegacias);
    },

    async store(req, res) {

        const { name, email, password, latitude, longitude } = req.body;


        const emailExists = await Delegacia.findOne({
            email
        });

        if(emailExists){
            return res.status(401).json({
                error: 'Delegacia already exists'
            });
        }

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const id = await getId();
        const { token } = generatedToken();
        const checkAccounToken  = token;
        const active = true;
        const accountChecked = false;

        const passwordCrypt = await bcrypt.hash(password, 8);


        const delegacia = await Delegacia.create({ id, name, email, password: passwordCrypt, location, active, accountChecked, checkAccounToken });

        console.log("Delegacia");
        console.dir(delegacia);

        await accountActive.sendTokenCheckAccount(delegacia);

        return res.status(200).json({
            id,
            name,
            email
        });
    },

    async show(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        const delegacia = await Delegacia.findOne({ id });

        if (delegacia) {
            return res.status(200).json(delegacia);
        } else {
            return res.status(200).json({ message: 'Police Station not found' });
        }
    },

    async update(req, res) {

        const id = req.consumerId;

        const { name, email, password, latitude, longitude } = req.body; 

        const emailExists = await Delegacia.findOne({
            email
        });

        if(emailExists && emailExists.id != id){
            return res.status(401).json({
                error: 'Delegacia already exists'
            });
        }

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        let delegacia = await Delegacia.findOne({ id });

        if (delegacia) {
            await delegacia.updateOne({ id, name, email, password, location});
            return res.status(200).json({
                id,
                name,
                email,
                password,
                location
            });
        } else {
            return res.status(200).json({ message: 'Delegacia not found' });
        }

    },

    async destroy(req, res) {
        const { id } = req.params; // Verificar se é melhor pegar este ID do Token

        let delegacia = await Delegacia.findOne({ id });

        if(! (req.consumerId == id)){
            return res.status(400).json({Message: 'Operation not permitted'});
        }

        if (delegacia) {
            delegacia = await delegacia.updateOne({ $set: { active: false } });
            return res.status(200).json({ message: 'Delegacia deleted' });
        } else {
            return res.status(200).json({ message: 'Delegacia not found' });
        }
    }
}