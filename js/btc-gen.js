// Wrap all code in an IIFE to avoid polluting the global scope
(function() {
  let latestWallet = null;

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    // Use event listeners instead of inline event attributes
    generateBtn.addEventListener("click", generateBTC);
    downloadBtn.addEventListener("click", downloadWallet);
  });

  function generateBTC() {
    try {
      // Confirm that bip39 is available
      if (typeof bip39 === 'undefined') {
        throw new Error("bip39 is not loaded");
      }
      const mnemonic = bip39.generateMnemonic();
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const root = bitcoinjs.bip32.fromSeed(seed);
      const account = root.derivePath("m/44'/0'/0'/0/0");
      const { address } = bitcoinjs.payments.p2pkh({ pubkey: account.publicKey });
      const wif = account.toWIF();

      latestWallet = { mnemonic, address, wif };

      const outputBox = document.getElementById("outputBox");
      outputBox.innerHTML = `
        <p><strong>Mnemonic:</strong><br><textarea rows="2" readonly>${mnemonic}</textarea></p>
        <p><strong>BTC Address:</strong><br><code>${address}</code></p>
        <p><strong>Private Key (WIF):</strong><br><code>${wif}</code></p>
      `;
      document.getElementById("downloadBtn").style.display = "inline-block";
    } catch (err) {
      document.getElementById("outputBox").innerHTML =
        `<p style="color:red;">❌ Failed to generate: ${err.message}</p>`;
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
})();
