const fs = require("fs");
const log = require("../../helpers/log_handler");

let users = [];

const getCloudFiles = (userid) => {
  const contentDir = `${__dirname}/content/`;
  let array = [];

  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir);

  fs.readdirSync(contentDir).forEach((file) => {
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
      log("info", "Cloud System", `Ein Client hat das System verlassen (ID: ${socket.id})`);
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
