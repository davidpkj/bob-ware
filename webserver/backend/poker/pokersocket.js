const log = require("../../helpers/log_handler");
const Util = require("../../helpers/util");
const game = require("./models/game_class");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRequest", (name) => {
      socket.emit("joinResponse", game.join(name, socket.id));
    });

    socket.on("disconnect", () => {
      game.leave(socket.id);
    });
  });
}
