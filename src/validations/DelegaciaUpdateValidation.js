const Yup = require("yup");

const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
});

module.exports = async function (req, res, next) {

    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        return res.status(400).json({ error: 'Validation fails', messages: err.inner });
    }

};