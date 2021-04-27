import * as fs from "fs";
import * as ip from "ip";
import * as https from "https";
import * as express from "express";

import { log } from "../helpers/log_handler";
import * as constants from "../helpers/constants";

const key = fs.readFileSync(`${constants.paths.certificateDirectory}/key.pem`, "utf8");
const cert = fs.readFileSync(`${constants.paths.certificateDirectory}/cert.pem`, "utf8");
const credentials = { 
  key: key, 
  cert: cert, 
  passphrase: process.env.PASSPHRASE, 
};

const app = express();

app.use(express.static(constants.paths.publicDirectory));

const httpsServer = https.createServer(credentials, app);
const io = require("socket.io")(httpsServer);

// TODO: Implement true peer to peer
let broadcaster: any;

io.sockets.on("connection", (socket: any) => {
  socket.on("candidate", (id: any, message: any) => {
    socket.to(id).emit("candidate", socket.id, message);
  });

  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
    log(`info`, `Intercom`, `Broadcaster verbunden (${socket.id})`);
  });

  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
    log(`info`, `Intercom`, `Watcher verbunden (${socket.id})`);
  });

  socket.on("offer", (id: any, message: any) => {
    socket.to(id).emit("offer", socket.id, message);
  });

  socket.on("answer", (id: any, message: any) => {
    socket.to(id).emit("answer", socket.id, message);
  });

  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
    log(`info`, `Intercom`, `Verbindung unterbrochen (${socket.id})`);
  });
});

export const intercom = async () => {
  httpsServer.listen(process.env.HTTPS_PORT, () => {
    log(`info`, `Intercom`, `Intercom ist in Betrieb unter http://${ip.address()}:${process.env.HTTPS_PORT}/`);
  });
};
