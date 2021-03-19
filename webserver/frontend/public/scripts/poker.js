const socket = io();
let currentPlayers = [];

socket.on("appendMessage", (msg, sender) => {
  const p = document.createElement("p");
  let spanStyle;

  p.style.fontSize = "18px";
  p.style.margin = "0px";
  p.style.marginTop = "0.4em";

  if (sender !== "System") {
    spanStyle = "color: #c9c9c9"
  } else {
    p.style.color = "#ff2a2a  ";
    spanStyle = "color: #ffffff";
  }

  let span = `<span style="${spanStyle}">${sender}: </span>`;
  p.innerHTML = `${span} ${msg}`;
  document.querySelector(".messages").appendChild(p);
});

const sendUsername = () => {
  let name = usernameInput.value;

  if (name) {
    name = name.trim();
    name = name.replaceAll(/[\!\"\§\$\%\&\/\\\(\)\=\?\}\]\[\{\<\>\|\.\,\;\:\_\@\~\'\+\*]/g, "");

    if (name != "") socket.emit("joinRequest", name);
  }

  usernameInput.value = "";
  document.activeElement.blur();
}

const usernameInput = document.querySelector("#username");

usernameInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    sendUsername();
  }
});

document.querySelector("#login").addEventListener("click", sendUsername);
// document.querySelector("#logout").addEventListener("click", () => location.reload());

socket.on("joinResponse", (response) => {
  console.log(response);
  if (response) {
    /*
    document.querySelector(".name").innerText = response.player.name;
    document.querySelector(".chips").innerText = response.player.chips;
    */

    document.querySelector(".information-wrapper").remove();
    document.querySelector(".game").style.display = "flex";
  } else {
    alert("Anmeldung fehlgeschlagen");
  }
});

// TODO: @David was das? Kann das weg?
socket.on("gamestatechange", (gamestate) => {
  // if (gamestate.running) return; // spectate

  document.querySelector(".time").innerText = gamestate.time;
  document.querySelector(".readyCount").innerText = gamestate.readyCount;
  document.querySelector(".playerCount").innerText = gamestate.playerCount;
});

document.querySelector("#chat-input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    socket.emit("sendMessage", document.querySelector("#chat-input").value);
    document.querySelector("#chat-input").value = "";
  }
});

/* TODO: REMOVE DEV FUNC */
let bool = true;
function toggle () {
  if (bool) {
    document.querySelector(".game").style.display = "flex";
    document.querySelector("h1").style.display = "none";
    document.querySelector(".information-wrapper").style.display = "none";
    bool = !bool;
  } else { 
    document.querySelector(".game").style.display = "none";
    document.querySelector("h1").style.display = "block";
    document.querySelector(".information-wrapper").style.display = "block";
    bool = !bool;
  }
}

// Fügt die Spielernamen in die playerList ein
socket.on("roundStarting", (currentPlayers) => {
  renderPlayerList(currentPlayers);
});

// Schreibt die Blinds, Spielernamen und Chips in die Liste
const renderPlayerList = (players) => {
  const elements = document.getElementsByClassName("player");

  for (let index in elements) {
    if (index > players.length - 1) break;

    const player = players[index];
    elements[index].innerHTML = `${player.blind != "" ? `<span class="blind">[${player.blind.replaceAll(/[^A-Z]/g, "")}]</span> ` : ""}${player.name} (${player.chips})`;
  }
}