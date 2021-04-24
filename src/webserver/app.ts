import * as ip from "ip";
import * as path from "path";
import * as express from "express";

import { log } from "../helpers/log_handler";

const app = express();
const router = require("./router");

app.use("/", express.static(__dirname + "/frontend/public"));
app.use("/", router);

// Initialize SocketIO
const server = require("http").createServer(app);
const io = require("socket.io")(server);

require("./backend/cloud/cloudsocket")(io);
require("./backend/poker/pokersocket")(io);

// EJS Config
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");

// TODO: Initialize cleaner
// require("./helpers/clean_handler")();

const port = 8000;

export const webserver = () => {
    server.listen(port, log(`info`, `Webserver`, `Webserver ist in Betrieb unter http://${ip.address()}:${port}/`));
}
