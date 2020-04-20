const { Router } = require('express');
const routes = Router();

routes.get("/", (req, res) => {
    res.status(200).json({message: "Its works"});
})


module.exports = routes;