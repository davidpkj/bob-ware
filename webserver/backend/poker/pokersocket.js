const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

let interval = null;
let gameState = null;

const startRound = () => {
  game.startRound();
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRequest", (name) => {
      socket.emit("joinResponse", game.join(name, socket.id));
    });

    socket.on("toggleReadyState", () => {
      if (game.toggleReadyState(socket.id)) {
        if (interval != null) return;

        let time = 30;

        interval = setInterval(() => {
          gameState = game.getState();
          gameState.time = time;
          socket.emit("gamestatechange", gameState);
          console.log(gameState);
          if (gameState.readyCount == 0 || time == 0) {
            clearInterval(interval);
            interval = null;

            if (time == 0) startRound();
          }
          time--;
        }, 1000);
      }
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
