async function generateKeypair() {
  const out = document.getElementById("outputBox");

  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const pub = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const priv = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  const pubStr = btoa(String.fromCharCode(...new Uint8Array(pub)));
  const privStr = btoa(String.fromCharCode(...new Uint8Array(priv)));

  out.innerHTML = `
    <p><strong>Public Key:</strong><br><textarea rows=6>${pubStr}</textarea></p>
    <p><strong>Private Key:</strong><br><textarea rows=8>${privStr}</textarea></p>
  `;
}
