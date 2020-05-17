const Yup = require("yup");

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  token: Yup.string().required().min(3),
});

module.exports = async function (req, res, next) {

  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.inner });
  }

};