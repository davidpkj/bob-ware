const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

let io; 

const roundStarting = () => {
  io.emit("roundStarting", game.currentPlayers); // Blinds ürüber
}

module.exports = (pio) => {
  io = pio;

  io.on("connection", (socket) => {
    socket.on("joinRequest", async (name) => {
      let response = await game.join(name, socket.id, roundStarting);
      socket.emit("joinResponse", response);

      /* Wozu?
      if (response.roundStarting) {
        // Array mit [0] = Big Blind; [1] = Small Blind; [2] = Dealer; 
      }
      */

      socket.on("sendMessage", (msg) => {
        io.emit("appendMessage", msg, game.getMessageSender(socket.id));
      });
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
