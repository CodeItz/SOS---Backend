const Yup = require("yup");

const schema = Yup.object().shape({
    id: Yup.number().required(),
    status: Yup.string().required().min(3)
});

module.exports =  schema;