const Yup = require("yup");

const schema = Yup.object().shape({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    tipo: Yup.string().required().min(3),
    description: Yup.string().required().min(10),
    isArmed: Yup.boolean().required(),
    howManyCriminals: Yup.string().required(),
});

module.exports = async function (req, res, next) {

    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        return res.status(400).json({ error: 'Validation fails', messages: err.inner });
    }

};