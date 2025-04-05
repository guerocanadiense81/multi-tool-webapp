async function signMessage() {
  const message = document.getElementById("message").value.trim();
  const out = document.getElementById("outputBox");

  if (!message) {
    out.innerHTML = "<p style='color:red;'>Please enter a message to sign.</p>";
    return;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const key = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true, ["sign", "verify"]
  );

  const signature = await crypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, key.privateKey, data);
  const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");

  out.innerHTML = `
    <p><strong>Signature (hex):</strong></p>
    <textarea readonly>${sigHex}</textarea>
  `;
}
