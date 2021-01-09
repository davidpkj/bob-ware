const socket = io();

const createFileAnchor = (url) => {
  const a = document.createElement("a");
  a.innerText = url;
  a.href = url;

  document.querySelector(".list").appendChild(a);
}

socket.on("cloudDataResponse", (data) => {
  document.querySelector(".list").innerHTML = "";

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

  document.querySelector("input").disabled = true;

  await fetch("/cloud/upload", {method: "POST", body: formData});

  
  alert("Upload ist fertig");
  socket.emit("cloudDataRequest");
  document.querySelector("input").disabled = false;
});

socket.emit("cloudDataRequest");