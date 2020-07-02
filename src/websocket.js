const socketio = require("socket.io");
let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log(socket.id);
    const { id_delegacia } = socket.handshake.query;

    connections.push({
      id: socket.id,
      id_delegacia: Number(id_delegacia),
    });
  });
};

exports.filterConnection = (id_delegacia) => {
  return connections.find((elemento) => elemento.id_delegacia == id_delegacia);
};

exports.sendMessage = (to, message, data) => {
  const { id } = to;

  io.to(id).emit(message, data);
};
