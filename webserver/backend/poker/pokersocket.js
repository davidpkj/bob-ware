const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

let io; 

const roundStarting = () => {
  io.emit("roundStarting", game.currentPlayers);
}

const routeMessage = (socket, message) => {
  let messageObject = game.evaluateMessage(message, socket.id);

  if (messageObject.system) {
    socket.emit("appendMessage", messageObject);
    return;
  }

  io.emit("appendMessage", messageObject);
}

module.exports = (pio) => {
  io = pio;

  io.on("connection", (socket) => {
    socket.on("joinRequest", async (name) => {
      let response = await game.join(name, socket.id, roundStarting);
      socket.emit("joinResponse", response);

      socket.on("sendMessage", (message) => {routeMessage(socket, message);});
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
