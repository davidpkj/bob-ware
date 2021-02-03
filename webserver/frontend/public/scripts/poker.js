var socket = io();

const join = () => {    // tut den Namen nach submit in pList
    const name = document.getElementById("playerName").value;
    document.getElementById("playerName").value = "";

    const p = document.createElement("p");
    p.innerHTML = name;
    document.getElementById("pList").appendChild(p);
};