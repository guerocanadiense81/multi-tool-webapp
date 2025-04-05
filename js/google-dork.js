function generateDork() {
  const term = document.getElementById("term").value.trim();
  if (!term) return alert("Enter a search term.");
  const queries = [
    `site:pastebin.com ${term}`,
    `inurl:admin ${term}`,
    `intitle:index.of ${term}`,
    `intext:${term}`,
    `filetype:txt ${term}`,
    `site:github.com ${term}`,
    `cache: ${term}`
  ];
  let out = "<ul>";
  queries.forEach(q => {
    out += `<li><a href="https://www.google.com/search?q=${encodeURIComponent(q)}" target="_blank">${q}</a></li>`;
  });
  out += "</ul>";
  document.getElementById("outputBox").innerHTML = out;
}
