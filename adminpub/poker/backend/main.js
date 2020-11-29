const game = require("../backend/models/game_class");
const log = require("../../helpers/log_handler");

module.exports = (io) => {
  io.on("connection", (socket) => {
    new log("info", "Poker Server", "Ein Client hat eine Verbindung aufgebaut");

    // Poker communication logic

    socket.on("disconnect", () => {
      new log("info", "Poker Server", "Ein Client hat seine Verbindung unterbrochen");
    });
  });
}

game.start();
