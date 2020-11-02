const ip = require("ip");
const colors = require("colors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = 1337;
const router = require("./router");

app.use(express.static(__dirname + "/dashboard/frontend/public"));
app.use(express.static(__dirname + "/poker/frontend/public"));
app.use("/", router);

const poker = require("./poker/backend/main")(io);

http.listen(port, console.log(colors.green(`Adminpub ist in Betrieb unter http://${ip.address()}:${port}/`)));