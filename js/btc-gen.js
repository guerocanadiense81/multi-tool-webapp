function generateBTC() {
  try {
    const bip39 = window.bip39;
    const bitcoin = window.bitcoinjs;

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bitcoin.bip32.fromSeed(seed);
    const account = root.derivePath("m/44'/0'/0'/0/0");

    const { address } = bitcoin.payments.p2pkh({
      pubkey: account.publicKey
    });

    const wif = account.toWIF();

    document.getElementById("outputBox").innerHTML = `
      <p><strong>Mnemonic:</strong><br><textarea rows="2">${mnemonic}</textarea></p>
      <p><strong>BTC Address:</strong><br><code>${address}</code></p>
      <p><strong>Private Key (WIF):</strong><br><code>${wif}</code></p>
    `;
  } catch (err) {
    document.getElementById("outputBox").innerHTML =
      "<p style='color:red;'>❌ Failed to generate: " + err.message + "</p>";
  }
}
