let users = [];

module.express = (io) => {
  io.on("connection", (socket) => {
    users.push(socket.id);  

    socket.on("download", () => {
      socket.emit("");
    });

    socket.on("upload", () => {

    });

    socket.on("disconnect", () => {
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
