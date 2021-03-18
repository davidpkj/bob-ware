const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

// Über Callback kann eine Runde gestartet werden
// Kannst auch etwas besseres als eine Callback, die 3x weitergereicht wird benutzen @David
const sendSocketRoundStartCallback = () => {
  game.startRound();
  io.emit("roundStarting", game.currentPlayers);
  
  // Array mit [0] = Big Blind; [1] = Small Blind; [2] = Dealer; 
  io.emit("blinds", game.setBlinds().res);
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRequest", async (name) => {

      socket.on("sendMessage", (msg) => {
        io.emit("appendMessage", msg, game.getMessageSender(socket.id));
      });
      

      let response = await game.join(name, socket.id, sendSocketRoundStartCallback);
      socket.emit("joinResponse", response);
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
