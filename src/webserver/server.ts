import * as ip from "ip";
import * as path from "path";
import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";

import { router } from "./router";
import { log } from "../helpers/log_handler";
import { cloudsocket } from "./backend/cloud/cloudsocket";
import { pokersocket } from "./backend/poker/pokersocket";

const port = 8000;
const app = express();

const directory = path.join(__dirname, "../public/")

app.use("/", express.static(directory));
app.use("/", router);

// Initialize SocketIO
const server = http.createServer(app);
const io = new Server(server);

cloudsocket(io);
pokersocket(io);

// EJS Config
app.set("views", path.join(directory, "./views/"));
app.set("view engine", "ejs");

// TODO: Initialize cleaner
// require("./helpers/clean_handler")();

export const webserver = () => {
  server.listen(port, () => {
    log(
      `info`,
      `Webserver`,
      `Webserver ist in Betrieb unter http://${ip.address()}:${port}/`,
    );
  });
};
