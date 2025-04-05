let latestWallet = null;

function generateBTC() {
  try {
    const mnemonic = window.bip39.generateMnemonic();
    const seed = window.bip39.mnemonicToSeedSync(mnemonic);
    const root = bitcoinjs.bip32.fromSeed(seed);
    const account = root.derivePath("m/44'/0'/0'/0/0");
    const { address } = bitcoinjs.payments.p2pkh({ pubkey: account.publicKey });
    const wif = account.toWIF();

    latestWallet = { mnemonic, address, wif };

    document.getElementById("outputBox").innerHTML = `
      <p><strong>Mnemonic:</strong><br><textarea rows="2" readonly>${mnemonic}</textarea></p>
      <p><strong>BTC Address:</strong><br><code>${address}</code></p>
      <p><strong>Private Key (WIF):</strong><br><code>${wif}</code></p>
    `;
    document.getElementById("downloadBtn").style.display = "inline-block";
  } catch (err) {
    document.getElementById("outputBox").innerHTML =
      `<p style='color:red;'>❌ Failed to generate: ${err.message}</p>`;
    document.getElementById("downloadBtn").style.display = "none";
  }
}

function downloadWallet() {
  if (!latestWallet) return;

  const text = `
BTC Wallet

Mnemonic:
${latestWallet.mnemonic}

Address:
${latestWallet.address}

Private Key (WIF):
${latestWallet.wif}
`;

  const blob = new Blob([text.trim()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "btc-wallet.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
