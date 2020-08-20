const Yup = require("yup");

const schema = Yup.object().shape({
  id_ocorrencia: Yup.number().required(),
  avaliation: Yup.number().required(),
});

module.exports = async function (req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
