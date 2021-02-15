const socket = io();

const appendMessage = (msg) => {
  const p = document.createElement("p");

  p.innerText = msg;
  document.querySelector(".messages").appendChild(p);
}

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
  if (response != {}) {
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

socket.on("gamestatechange", (gamestate) => {
  // if (gamestate.running) return; // spectate

  document.querySelector(".time").innerText = gamestate.time;
  document.querySelector(".readyCount").innerText = gamestate.readyCount;
  document.querySelector(".playerCount").innerText = gamestate.playerCount;
});

document.querySelector("#chat-input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    appendMessage(document.querySelector("#chat-input").value);
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
toggle();

/* */