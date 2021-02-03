const game = require("./models/game_class");
const log = require("../../helpers/log_handler");

module.exports = (io) => {
  io.on("connection", (socket) => {
    log("info", "Poker Server", "Ein Client hat eine Verbindung aufgebaut");

    // Poker communication logic

    socket.on("disconnect", () => {
      log("info", "Poker Server", "Ein Client hat seine Verbindung unterbrochen");
    });
  });
}

game.start();
