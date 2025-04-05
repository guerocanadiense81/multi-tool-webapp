const dorks = {
  surface: ["inurl:login", "filetype:pdf confidential", "intitle:index.of"],
  deep: ["site:pastebin.com password", "intext:'ssn' filetype:txt"],
  dark: ["ahmia search onion", "inurl:.onion login", "bitcoin site:dark.fail"]
};

function loadDorks() {
  const type = document.getElementById("typeSelect").value;
  const list = dorks[type] || [];
  document.getElementById("outputBox").innerHTML = list.map(d =>
    `<li><a target='_blank' href='https://www.google.com/search?q=${encodeURIComponent(d)}'>${d}</a></li>`
  ).join("");
}

window.onload = loadDorks;
