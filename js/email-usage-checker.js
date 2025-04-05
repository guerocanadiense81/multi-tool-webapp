function checkUsage() {
  const email = document.getElementById("emailCheck").value.trim();
  const out = document.getElementById("outputBox");
  const found = ["gmail.com", "netflix.com", "facebook.com"].some(domain => email.endsWith(domain));
  out.innerHTML = found
    ? `<p style='color:lime;'>✅ Likely used on common platforms</p>`
    : `<p style='color:orange;'>⚠️ No known match, but not conclusive</p>`;
}
