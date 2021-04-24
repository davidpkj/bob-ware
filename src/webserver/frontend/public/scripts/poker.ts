const socket = io();
let currentPlayers = [];

// TODO: Einmal alles durchkommentieren

//
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

//
const usernameInput = document.querySelector("#username");

//
usernameInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    sendUsername();
  }
});

//
document.querySelector("#login").addEventListener("click", sendUsername);
// document.querySelector("#logout").addEventListener("click", () => location.reload());

// 
document.querySelector("#chat-input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();

    const input = document.querySelector("#chat-input");
    socket.emit("sendMessage", input.value);
    input.value = "";
  }
});

// 
socket.on("appendMessage", (messageObject) => {
  const p1 = document.createElement("p");
  p1.innerHTML = `${messageObject.sender}: <span class="${messageObject.type}">${messageObject.content}</span>`;
  document.querySelector(".messages").appendChild(p1);

  if (messageObject.system) {
    const p2 = document.createElement("p");
    p2.innerHTML = `Dealer: <span class="system">${messageObject.system}</span>`;
    document.querySelector(".messages").appendChild(p2);
  }
});

// 
socket.on("joinResponse", (response) => {
  if (response) {
    document.querySelector(".information-wrapper").remove();
    document.querySelector(".game").style.display = "flex";
  } else {
    alert("Anmeldung fehlgeschlagen");
  }
});

// Empfängt das Signal einer neuen Runde
socket.on("roundStarting", (currentPlayers) => {
  renderPlayerList(currentPlayers);
});

// Zeigt die ersten beiden Karten
socket.on("preflop", (card) => {
  let hand = document.querySelectorAll(".hand > .card");

  if (hand[0].src == "http://localhost:1337/assets/poker/cards/default.png") {
    hand[0].src = `http://localhost:1337/assets/poker/cards/${card.suit}${card.number}.png`;
  } else {
    hand[1].src = `http://localhost:1337/assets/poker/cards/${card.suit}${card.number}.png`;
  }
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