const fs = require("fs");
const log = require("../../helpers/log_handler");

let users = [];

const getCloudFiles = (userid) => {
  let array = [];

  fs.readdirSync(__dirname + "/content/").forEach((file) => {
    array.push(file);
  });

  log("info", "Cloud System", `Anfrage auf Dateiendatenbankinhalt wurde genehmigt (SocketID: ${userid})`);

  return array;
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    users.push(socket.id);

    socket.on("cloudDataRequest", () => {
      socket.emit("cloudDataResponse", getCloudFiles(socket.id));
    });

    socket.on("disconnect", () => {
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
