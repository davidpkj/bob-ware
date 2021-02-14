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
// document.querySelector("#logout").addEventListener("click", () => location.reload());

socket.on("joinResponse", (response) => {
  if (response != {}) {
    /*
    document.querySelector(".name").innerText = response.player.name;
    document.querySelector(".chips").innerText = response.player.chips;
    */

    document.querySelector(".information-wrapper").remove();
    document.querySelector(".game").style.display = "block";
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

let bool = true;
function toggle () {
  if (bool) {
    document.querySelector(".game").style.display = "block";
    document.querySelector("h1").style.display = "none";
    document.querySelector(".information-wrapper").style.display = "none";
    document.querySelector("body").style.height = "55vh";
    bool = !bool;
  } else { 
    document.querySelector(".game").style.display = "none";
    document.querySelector("h1").style.display = "block";
    document.querySelector(".information-wrapper").style.display = "block";
    document.querySelector("body").style.height = "100vh";
    bool = !bool;
  }
}
toggle();

function msg (msg) {
  const p = document.createElement("p");
  p.innerHTML = msg;
  p.style.fontSize = "14px";
  p.style.color = "#FFFFFF80";
  p.style.margin = "10px";
  p.style.marginBottom = "0px";
  document.querySelector(".chat").appendChild(p);
}