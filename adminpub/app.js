const ip = require("ip");
const colors = require("colors");
const express = require("express");
const app = express();

const port = 1337;
const router = require("./router");

app.use(express.static(__dirname + "/dashboard/public"));
app.use(express.static(__dirname + "/poker/public"));
app.use("/", router);

app.listen(port, console.log(colors.green(`Adminpub ist in Betrieb unter http://${ip.address()}:${port}/`)));
