const socket = io();

const createFileAnchor = (url) => {
  const a = document.createElement("a");
  a.innerText = url;
  a.href = url;

  document.querySelector("div").appendChild(a);
}

socket.on("cloudDataResponse", (data) => {
  document.querySelector("div").innerHTML = "";

  if (data) {
    for (let i of data) {
      createFileAnchor(i);
    }
  }
});

document.querySelector("input").addEventListener("change", async (_) => {
  let file = document.querySelector("input").files[0];
  let formData = new FormData();

  formData.append("file", file);

  await fetch("/cloud/upload", {method: "POST", body: formData});

  alert("Upload ist fertig");
  socket.emit("cloudDataRequest");
});

socket.emit("cloudDataRequest");