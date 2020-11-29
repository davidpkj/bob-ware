const fs = require('fs');
const http = require('http');
const https = require('https');

const key  = fs.readFileSync("./key.pem", "utf8");
const cert = fs.readFileSync("./cert.pem", "utf8");
const pass = fs.readFileSync("./passphrase", "utf8")
const credentials = {key: key, cert: cert, passphrase: pass};
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/intercom-frettchen/public"));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const io = require("socket.io")(httpsServer);

let broadcaster

io.sockets.on("connection", socket => {
  console.log(socket.id)

  socket.on("broadcaster", () => {
    console.log(socket.id,"broadcast");
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });

  socket.on("watcher", () => {
    console.log(socket.id,"watcher");
    socket.to(broadcaster).emit("watcher", socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id,"disconnect");
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });

  socket.on("offer", (id, message) => {
    console.log(socket.id,"offer");
    socket.to(id).emit("offer", socket.id, message);
  });

  socket.on("answer", (id, message) => {
    console.log(socket.id,"answer");
    socket.to(id).emit("answer", socket.id, message);
  });

  socket.on("candidate", (id, message) => {
    console.log(socket.id,"candidate");
    socket.to(id).emit("candidate", socket.id, message);
  });
});

httpServer.listen(8080, console.log("http started"));
httpsServer.listen(8443, console.log("https started"));
