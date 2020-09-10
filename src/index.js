const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
var RateLimit = require('express-rate-limit');
var MongoStore = require('rate-limit-mongo');

const { setupWebsocket } = require("./websocket");

const app =  express();
const server = http.Server(app);

setupWebsocket(server);

const port = process.env.PORT || 8080;

const routes = require("./routes");
const authDB = require("./config/authDatabase");

// abstrair isso daqui, em breve
const databaseUrl = `mongodb+srv://${authDB.user}:${authDB.password}@policego-51yhr.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const oneSecondInMilliSeconds = 1000;
const oneMinute = oneSecondInMilliSeconds * 60;
const tenMinutes = oneMinute * 10;

var limiter = new RateLimit({
  store: new MongoStore({
    uri: databaseUrl,
  }),
  max: 100,
  windowMs: tenMinutes
});


app.use(cors()); // permite acesso de outros endereços
app.use(express.json());
app.use(helmet()); // helmet configura e habilita proteção no headers
app.use(limiter); // limita em todas as rotas
app.use(routes);

server.listen(port, () => {
    console.log(`O servidor está escutando na porta ${port}`);
});