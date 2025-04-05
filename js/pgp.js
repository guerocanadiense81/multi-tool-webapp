async function generatePGP() {
  const name = document.getElementById("pgpName").value;
  const email = document.getElementById("pgpEmail").value;
  const pass = document.getElementById("pgpPass").value;

  if (!name || !email || !pass) {
    return alert("All fields are required.");
  }

  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name, email }],
    passphrase: pass
  });

  document.getElementById("pgpPub").value = publicKey;
  document.getElementById("pgpPriv").value = privateKey;
}

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand('copy');
  alert("Copied!");
}
