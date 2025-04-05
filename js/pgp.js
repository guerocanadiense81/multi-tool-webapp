async function generatePGP() {
  const name = document.getElementById("pgpName").value;
  const email = document.getElementById("pgpEmail").value;
  const pass = document.getElementById("pgpPass").value;

  if (!name || !email || !pass) {
    return alert("⚠️ All fields required.");
  }

  const { privateKey, publicKey } = await openpgp.generateKey({
    type: "rsa",
    rsaBits: 2048,
    userIDs: [{ name, email }],
    passphrase: pass,
  });

  document.getElementById("pgpPub").value = publicKey;
  document.getElementById("pgpPriv").value = privateKey;
}

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand("copy");
  alert("✅ Copied!");
}

async function encryptMessage() {
  const messageText = document.getElementById("encryptMessage").value;
  const pubKeyArmored = document.getElementById("encryptWithPub").value;

  if (!messageText || !pubKeyArmored) return alert("Please provide both a message and public key.");

  const publicKey = await openpgp.readKey({ armoredKey: pubKeyArmored });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: messageText }),
    encryptionKeys: publicKey
  });

  document.getElementById("encryptedOutput").value = encrypted;
}

async function decryptMessage() {
  const encrypted = document.getElementById("decryptMessage").value;
  const privKeyArmored = document.getElementById("decryptWithPriv").value;
  const password = document.getElementById("decryptPass").value;

  if (!encrypted || !privKeyArmored || !password) {
    return alert("Please fill in the message, private key, and password.");
  }

  try {
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privKeyArmored }),
      passphrase: password
    });

    const message = await openpgp.readMessage({ armoredMessage: encrypted });
    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey
    });

    document.getElementById("decryptedOutput").value = decrypted;
  } catch (err) {
    alert("❌ Decryption failed: " + err.message);
  }
}
