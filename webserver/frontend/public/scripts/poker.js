var socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById("playerName").value;
    if (name) {
        name.trim();
        socket.emit("join", name);
        
        const p = document.createElement("p");
        p.innerHTML = name;
        document.getElementById("pList").appendChild(p);
        name = "";
    } 
});