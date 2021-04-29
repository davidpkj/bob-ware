import * as ytdl from "ytdl-core";
import * as Discord from "discord.js";

let queue: Array<any> = [];
let connection: Discord.VoiceConnection, dispatcher: Discord.BroadcastDispatcher, audiostream: any;

const stream = () => {
  if (queue.length == 0) {
    stop(null, null);
    return;
  }

  audiostream = ytdl(queue[0], { filter: "audioonly", highWaterMark: 1 << 25 });
  dispatcher = connection.play(audiostream);

  dispatcher.on("finish", () => {
    queue.shift();

    if (queue[0]) {
      stream();
    } else {
      stop(null, null);
    }
  });
}

const play = async (_: any, msg: Discord.Message) => {
  const args = msg.content.substring(1).split(" ");

  if (!args[1]) {
    msg.channel.send("Bitte geben Sie mir einen Link");
    return;
  }

  if (!msg.member.voice.channel) {
    msg.channel.send("Bitte gehen Sie in den Tanzbereich");
    return;
  }

  queue.push(args[1]);

  if (!connection || !msg.guild.voice) connection = await msg.member.voice.channel.join();
  if (!dispatcher) stream();
}

const stop = (_: any, __: any) => {
  connection.disconnect();
  connection = null;
}

const pause = (_: any, __: any) => {
  dispatcher.pause();
}

const resume = (_: any, __: any) => {
  dispatcher.resume();
}

const skip = (_: any, __: any) => {
  queue.shift();
  stream();
}

const nowplaying = (_: any, msg: Discord.Message) => {
  msg.reply("Am arsch");
}

export const controls = {
  "play": play,
  "stop": stop,
  "pause": pause,
  "resume": resume,
  "skip": skip,
  "nowplaying": nowplaying
}