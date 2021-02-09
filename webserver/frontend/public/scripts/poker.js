const socket = io();

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
document.querySelector("#logout").addEventListener("click", () => location.reload());

const readyButton = document.querySelector("#ready");

readyButton.addEventListener("click", () => {
  readyButton.classList.toggle("enabled");
  socket.emit("toggleReadyState");
  document.activeElement.blur();
});

socket.on("joinResponse", (response) => {
  if (response != {}) {
    document.querySelector(".name").innerText = response.name;
    document.querySelector(".chips").innerText = response.chips;

    document.querySelector(".login").remove();
    document.querySelector(".information").style.display = "block";
  } else {
    alert("Anmeldung fehlgeschlagen");
  }
});

socket.on("gamestatechange", (gamestate) => {
  // if (gamestate.running) return; // spectate

  document.querySelector(".time").innerText = gamestate.time;
  document.querySelector(".readyCount").innerText = gamestate.readyCount;
  document.querySelector(".playerCount").innerText = gamestate.playerCount;
});