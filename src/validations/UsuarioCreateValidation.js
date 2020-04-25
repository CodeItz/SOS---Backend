const Yup = require("yup");

const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    cpf: Yup.string().required().length(14)
});

module.exports =  schema;