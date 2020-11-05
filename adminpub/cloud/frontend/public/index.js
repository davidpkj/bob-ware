document.querySelector("input").addEventListener("change", (_) => {
  let file = document.querySelector("input").files[0];
  let formData = new FormData();

  formData.append("file", file);

  fetch("/cloud/upload", {method: "POST", body: formData});
});