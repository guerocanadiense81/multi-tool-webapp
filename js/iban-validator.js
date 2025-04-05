function validateIBAN() {
  const iban = document.getElementById("ibanInput").value.replace(/\\s+/g, '').toUpperCase();
  const out = document.getElementById("outputBox");

  if (!iban || iban.length < 5) {
    out.innerHTML = "<p style='color:red;'>Invalid IBAN format.</p>";
    return;
  }

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, ch => ch.charCodeAt(0) - 55);
  const valid = BigInt(numeric) % 97n === 1n;

  out.innerHTML = valid
    ? `<p style='color:lime;'>✅ IBAN is valid: ${iban}</p>`
    : `<p style='color:red;'>❌ Invalid IBAN.</p>`;
}
