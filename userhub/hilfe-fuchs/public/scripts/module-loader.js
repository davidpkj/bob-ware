const addElement = async (elem, cont, anch, clas, id, plem) => {
  const element = document.createElement(elem);

  if (cont) element.innerText = cont;
  if (anch) element.href = anch;
  if (clas) element.classList.add(clas);
  if (id) element.id = id;

  plem = await plem;

  plem.appendChild(element);

  return element;
};

const runCategory = async () => {
  switch (location.pathname.split("/")[1]) {
    case "faq":
      import("../assets/data/faq-data.js").then((module) => {
        listenForSearch();
        panelCreate(module.faq).then(() => {
          if (document.querySelector("#list").childElementCount == 1) {
            console.log(document.querySelector("#list").childElementCount);
            document.querySelector("#empty").classList.remove("hidden");
          }
        });
      });
      break;
    case "explanation":
      import("../assets/data/explanation-data.js").then((module) => {
        contentCreate(module.explanation);
      });
      break;
    case "other":
      import("../assets/data/other-data.js").then((module) => {
        listenForSearch();
        panelCreate(module.module).then(() => {
          if (document.querySelector("#list").childElementCount == 1) {
            console.log(document.querySelector("#list").childElementCount);
            document.querySelector("#empty").classList.remove("hidden");
          }
        });
      });
      break;
    default:
      console.error("Error: Unknown category");
      break;
  }
}

const listenForSearch = async () => {
  document.getElementById("search-bar").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();

      document.getElementById("search-button").click();
    }
  });

  document.getElementById("search-button").addEventListener("click", () => {
    const value = document.getElementById("search-bar").value;
    const link = `${location.origin + location.pathname}`;

    location.replace(location.href == link ? `${location.href}?filter=${value}` : `${link}?filter=${value}`);
  });

  document.getElementById("search-clearer").addEventListener("click", () => {
    location.replace(location.origin + location.pathname);
  });
}

const objectHasFilter = async (object, filter) => {
  if (!filter) return true;
  if (object["q"].toLowerCase().includes(filter) || object["a"].toLowerCase().includes(filter)) return true;
}

const getParameter = async (param) => {
  const url = new URL(location.href);

  return url.searchParams.get(param);
}

const panelCreate = async (faqArray) => {
  const filter = location.search == "" ? null : getParameter("filter").toLowerCase();

  try {
    for (let obj of faqArray) {
      if (!objectHasFilter(obj, filter)) continue;

      addElement("button", obj["q"], null, "dropdown", null, document.querySelector("#list")).then((button) => {
        button.addEventListener("click", (event) => {
          event.target.classList.toggle("active");

          let panel = event.target.nextElementSibling;

          panel.style.maxHeight = (panel.style.maxHeight ? null : `${panel.scrollHeight}px`);
        });
      });

      addElement("p", obj["a"], null, null, null, addElement("div", null, null, "panel", null, document.querySelector("#list")));
    }
  } catch (e) {
    console.error("Error: " + e);
  }
}

const contentCreate = async (explanationArray) => {
  for (let obj of explanationArray) {
    let t = obj["t"];
    let ref = `${t.toLowerCase().replace(" ", "-")}`;

    addElement("h2", t, null, null, ref, document.querySelector("#list"));
    addElement("p", obj["p"], null, null, null, document.querySelector("#list"));
    addElement("a", t, `#${ref}`, null, null, document.querySelector("#contents"));
  }
}

runCategory();
