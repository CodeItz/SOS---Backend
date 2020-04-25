const Yup = require("yup");

const schema = Yup.object().shape({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    tipo: Yup.string().required().min(3),
    description: Yup.string().required().min(10)
});

module.exports =  schema;