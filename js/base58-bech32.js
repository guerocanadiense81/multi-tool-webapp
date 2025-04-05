function convertValue() {
  const input = document.getElementById("inputValue").value.trim();
  const out = document.getElementById("outputBox");

  try {
    const isHex = /^[0-9a-fA-F]+$/.test(input);
    if (isHex) {
      const buffer = Buffer.from(input, "hex");
      const base58 = require("bs58").encode(buffer);
      out.innerHTML = `<p><strong>Base58:</strong> ${base58}</p>`;
    } else {
      const decoded = require("bs58").decode(input);
      out.innerHTML = `<p><strong>Hex:</strong> ${decoded.toString("hex")}</p>`;
    }
  } catch (e) {
    out.innerHTML = "<p style='color:red;'>Invalid format.</p>";
  }
}
