// Wrap all code in an IIFE to avoid polluting the global scope
(function() {
  let latestWallet = null;

  // Attach event listeners after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    generateBtn.addEventListener("click", generateBTC);
    downloadBtn.addEventListener("click", downloadWallet);
  });

  function generateBTC() {
    try {
      // Verify that bitcore and bitcore.Mnemonic are loaded
      if (typeof bitcore === 'undefined' || typeof bitcore.Mnemonic === 'undefined') {
        throw new Error("bitcore-mnemonic is not loaded");
      }
      // Generate the mnemonic using bitcore-mnemonic
      const mnemonicObj = new bitcore.Mnemonic();
      const mnemonic = mnemonicObj.toString();
      const seed = mnemonicObj.toSeed(); // Returns a Buffer

      // Use bitcoinjs-lib to derive the wallet
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
      // Instead of setting inline style, remove the "hidden" class to show the button
      document.getElementById("downloadBtn").classList.remove("hidden");
    } catch (err) {
      document.getElementById("outputBox").innerHTML =
        `<p class="error">❌ Failed to generate: ${err.message}</p>`;
      // Add the "hidden" class to hide the download button on error
      document.getElementById("downloadBtn").classList.add("hidden");
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
