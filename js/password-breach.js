const dummyBreaches = ["123456", "password", "letmein", "qwerty", "abc123"];

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const out = document.getElementById("outputBox");

  if (!input) {
    out.innerHTML = "<p style='color: orange;'>Enter a password to check.</p>";
    return;
  }

  const breached = dummyBreaches.includes(input.toLowerCase());
  out.innerHTML = breached
    ? "<p style='color: red;'>⚠️ This password is found in known breaches!</p>"
    : "<p style='color: lime;'>✅ This password does not match known test leaks.</p>";
}
