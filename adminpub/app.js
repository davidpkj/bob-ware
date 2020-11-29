const ip = require("ip");
const colors = require("colors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = 1337;

const rootRouter = require("./router");
const cloudRouter = require("./cloud/backend/router");

app.use("/dashboard", express.static(__dirname + "/dashboard/frontend/public"));
app.use("/cloud", express.static(__dirname + "/cloud/frontend/public"));
app.use("/poker", express.static(__dirname + "/poker/frontend/public"));
app.use("/cloud", cloudRouter);
app.use("/", rootRouter);

const pokerio = require("./poker/backend/main")(io);
const cloudio = require("./cloud/backend/main")(io);

http.listen(port, console.log(colors.green(`Adminpub ist in Betrieb unter http://${ip.address()}:${port}/\n`)));
