const Yup = require("yup");

const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
});

module.exports =  schema;