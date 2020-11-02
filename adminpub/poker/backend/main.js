const game = require("../backend/models/game_class");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Ein Client hat eine Verbindung aufgebaut");

    // Poker communication logic

    socket.on("disconnect", () => {
      console.log("Ein Client hat die Verbindung unterbrochen");  
    });
  });
}

game.start();