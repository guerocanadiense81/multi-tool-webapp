function generateDarkDork() {
  const term = document.getElementById("dorkInput").value.trim();
  const engines = [
    `https://ahmia.fi/search/?q=${term}`,
    `https://darksearch.io/search?query=${term}`,
    `http://onion.pet/?q=${term}`,
  ];

  const out = engines.map(url => `<li><a href='${url}' target='_blank'>${url}</a></li>`).join("");
  document.getElementById("outputBox").innerHTML = `<ul>${out}</ul>`;
}
