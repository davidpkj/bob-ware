let users = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    users.push(socket.id);  

    socket.on("disconnect", () => {
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
