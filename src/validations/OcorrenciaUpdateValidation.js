const Yup = require("yup");

const schema = Yup.object().shape({
    id: Yup.number().required(),
    status: Yup.string().required().min(3)
});

module.exports = async function (req, res, next) {

    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        return res.status(400).json({ error: 'Validation fails', messages: err.inner });
    }

};