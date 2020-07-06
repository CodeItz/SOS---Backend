const Yup = require("yup");

const schema = Yup.object().shape({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    tipo: Yup.string(),
    description: Yup.string(),
    isArmed: Yup.string(),
    howManyCriminals: Yup.string(),
});

module.exports = async function (req, res, next) {

    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        return res.status(400).json({ error: 'Validation fails', messages: err.inner });
    }

};