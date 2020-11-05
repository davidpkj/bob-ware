const fs = require("fs");

let users = [];

const getCloudFiles = () => {
  let array = [];

  fs.readdirSync(__dirname + "/content/").forEach((file) => {
    array.push(file);
  });

  console.log(array)

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
