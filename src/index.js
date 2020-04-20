const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app =  express();
const port = process.env.PORT || 8080;

const routes = require("./routes");
const authDB = require("./config/database");


mongoose.connect(`mongodb+srv://${authDB.user}:${authDB.password}@policego-51yhr.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors()); // permite acesso de outros endereços
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`O servidor está escutando na porta ${port}`);
});