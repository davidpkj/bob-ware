const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

let io; 

const roundStarting = () => {
  io.emit("roundStarting", game.currentPlayers);
}

module.exports = (pio) => {
  io = pio;

  io.on("connection", (socket) => {
    socket.on("joinRequest", async (name) => {
      let response = await game.join(name, socket.id, roundStarting);
      socket.emit("joinResponse", response);

      socket.on("sendMessage", (msg) => {
        io.emit("appendMessage", msg, game.getMessageSender(socket.id));
      });
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
