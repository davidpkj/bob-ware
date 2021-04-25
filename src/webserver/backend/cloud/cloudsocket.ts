import * as fs from "fs";

import { log } from "../../../helpers/log_handler";

let users: Array<string> = [];

const getCloudFiles = (userid: string): Array<string> => {
  const contentDir = `${__dirname}/data/`;
  let array: Array<string> = [];

  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir);

  fs.readdirSync(contentDir).forEach((file) => {
    array.push(file);
  });

  log("info", "Cloud System", `Anfrage auf Dateiendatenbankinhalt wurde genehmigt (SocketID: ${userid})`);

  return array;
}

export const cloudsocket = (io: any) => {
  io.on("connection", (socket: any): void => {
    users.push(socket.id);

    socket.on("cloudDataRequest", (): void => {
      socket.emit("cloudDataResponse", getCloudFiles(socket.id));
    });

    socket.on("disconnect", (): void => {
      log("info", "Cloud System", `Ein Client hat das System verlassen (ID: ${socket.id})`);
      users.splice(users.indexOf(socket.id), 1);
    });
  });
}
