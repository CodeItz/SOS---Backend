const socketio = require("socket.io");
let io;
let connections = []; // verificar a possibilidade de utilizar um banco de dados aqui;

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    const { id_delegacia } = socket.handshake.query;

    console.log("Conectou mais um");
    socket.emit("helcome", "Bem vindo");

    connections.push({
      id: socket.id,
      id_delegacia: Number(id_delegacia),
    });

    socket.on("disconnect", () => {
      connections = connections.filter((elemento) => elemento.id != socket.id);
    });
  });
};

exports.filterConnection = (id_delegacia) => {
  return connections.find((elemento) => elemento.id_delegacia == id_delegacia);
};

exports.sendMessage = (to, message, data) => {
  const { id } = to;

  console.log("Enviou para " + id);

  io.to(id).emit(message, data);
};
