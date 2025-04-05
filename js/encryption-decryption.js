function encrypt() {
  const text = document.getElementById("text").value;
  const pass = document.getElementById("password").value;
  const out = document.getElementById("outputBox");
  const encrypted = CryptoJS.AES.encrypt(text, pass).toString();
  out.innerHTML = `<p><strong>Encrypted:</strong><br><textarea>${encrypted}</textarea></p>`;
}

function decrypt() {
  const text = document.getElementById("text").value;
  const pass = document.getElementById("password").value;
  const out = document.getElementById("outputBox");
  try {
    const decrypted = CryptoJS.AES.decrypt(text, pass).toString(CryptoJS.enc.Utf8);
    out.innerHTML = `<p><strong>Decrypted:</strong><br><textarea>${decrypted}</textarea></p>`;
  } catch (e) {
    out.innerHTML = `<p style='color:red;'>❌ Failed to decrypt. Check password or text.</p>`;
  }
}
