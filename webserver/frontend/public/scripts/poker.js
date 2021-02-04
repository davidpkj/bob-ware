const socket = io();

const sendUsername = () => {
  const name = usernameInput.value;

  if (name) {
    name.trim();
    name.replace(/[\!\"\§\$\%\&\/\\\(\)\=\?\}\]\[\{\<\>\|\.\,\;\:\_\@\~\'\+\*]/, "");

    socket.emit("joinRequest", name);
  }

  usernameInput.value = "";
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
  }
});