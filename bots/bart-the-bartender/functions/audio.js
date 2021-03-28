const ytdl = require("ytdl-core");

let queue = [];
let connection, dispatcher, audiostream, percent;

const stream = () => {
  if (queue.length == 0) {
    stop();
    return;
  }

  audiostream = ytdl(queue[0], { filter: "audioonly", highWaterMark: 1 << 25 });
  dispatcher = connection.play(audiostream);

  dispatcher.on("finish", () => {
    queue.shift();

    if (queue[0]) {
      stream();
    } else {
      stop();
    }
  });
}

const play = async (_, msg) => {
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

const stop = (_, __) => {
  connection.disconnect();
  connection = null;
}

const pause = (_, __) => {
  dispatcher.pause();
}

const resume = (_, __) => {
  dispatcher.resume();
}

const skip = (_, __) => {
  queue.shift();
  stream();
}

const nowplaying = (_, msg) => {
  msg.reply("Am arsch");
}

module.exports = {
  "play": play,
  "stop": stop,
  "pause": pause,
  "resume": resume,
  "skip": skip,
  "nowplaying": nowplaying
}