const fs = require("fs");
const log = require("../../helpers/log_handler");

let users = [];

const getCloudFiles = () => {
  let array = [];

  fs.readdirSync(__dirname + "/content/").forEach((file) => {
    array.push(file);
  });

  new log("info", "Cloud Server", array)

  return array;
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    users.push(socket.id);  

    socket.on("cloudDataRequest", () => {
      socket.emit("cloudDataResponse", getCloudFiles());
    });

    socket.on("disconnect", () => {
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
