function addInput() {
  const div = document.createElement("div");
  div.innerHTML = `<label>Label: <input type="text" name="field" placeholder="Enter..." /></label><br>`;
  document.getElementById("formArea").appendChild(div);
}

function exportForm() {
  const formArea = document.getElementById("formArea");
  const output = formArea.innerHTML.replace(/<br>/g, "").trim();
  document.getElementById("outputBox").value = `<form>\n${output}\n</form>`;
}
