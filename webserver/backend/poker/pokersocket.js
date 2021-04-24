const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

let io; 

const roundStarting = (id, card) => {
  // Symbolisiert auf Clienstite, dass die Runde startet
  if (!card) {
    io.emit("roundStarting", game.currentPlayers);
    return
  }
  // Zeigt Clientsite die ersten 2 Karten an
  if (id) {
    io.to(id).emit('preflop', card);
    return
  }
  // Zeigt Clientsite die nächste Karte vom Tisch an
  io.emit("nextCard", card); // Implement on Client
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
