const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const { setupWebsocket } = require("./websocket");

const app =  express();
const server = http.Server(app);

setupWebsocket(server);

const port = process.env.PORT || 8080;

const routes = require("./routes");
const authDB = require("./config/authDatabase");

// abstrair isso daqui, em breve
mongoose.connect(`mongodb+srv://${authDB.user}:${authDB.password}@policego-51yhr.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors()); // permite acesso de outros endereços
app.use(express.json());
app.use(routes);

server.listen(port, () => {
    console.log(`O servidor está escutando na porta ${port}`);
});