const dorkPresets = {
  files: [
    'intitle:"index of" "backup"',
    'filetype:sql "password"',
    'filetype:env DB_PASSWORD',
    'filetype:log inurl:debug'
  ],
  cams: [
    'inurl:/view.shtml',
    'intitle:"Live View / - AXIS"',
    'inurl:top.htm inurl:currenttime',
    'intitle:"webcamXP 5"'
  ],
  credentials: [
    '"index of" passwd',
    '"index of" .git',
    '"db_password" filetype:env',
    'intitle:"Login" "admin" filetype:php'
  ],
  indexes: [
    'intitle:"index of" mp3',
    'intitle:"index of" confidential',
    'intitle:"index of" private',
    'intitle:"index of" backup'
  ],
  login: [
    'inurl:admin intitle:login',
    'intitle:"login page" "username"',
    'inurl:wp-login.php',
    'inurl:cpanel intitle:"login"'
  ]
};

function generateDorks() {
  const category = document.getElementById("dorkCategory").value;
  const customInput = document.getElementById("customInput");
  const output = document.getElementById("outputBox");
  output.innerHTML = "";

  let dorks = [];

  if (category === "custom") {
    customInput.style.display = "block";
    const keyword = customInput.value.trim();
    if (!keyword) return;
    dorks = [
      `inurl:${keyword}`,
      `intitle:${keyword}`,
      `filetype:txt ${keyword}`,
      `site:pastebin.com ${keyword}`
    ];
  } else {
    customInput.style.display = "none";
    dorks = dorkPresets[category] || [];
  }

  dorks.forEach(dork => {
    const encoded = encodeURIComponent(dork);
    const link = `https://www.google.com/search?q=${encoded}`;
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link}" target="_blank">${dork}</a>`;
    output.appendChild(li);
  });
}

function copyDorks() {
  const output = [...document.querySelectorAll("#outputBox li a")].map(a => a.textContent).join("\\n");
  navigator.clipboard.writeText(output).then(() => alert("✅ Dorks copied!"));
}

function openDorks() {
  [...document.querySelectorAll("#outputBox li a")].forEach(a => window.open(a.href, "_blank"));
}
