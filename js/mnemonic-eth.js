let ethWallet = null;

function generateMnemonic() {
  try {
    const bip39 = window.bip39;
    const ethers = window.ethers;

    const mnemonic = bip39.generateMnemonic();
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    ethWallet = {
      mnemonic,
      address: wallet.address,
      privateKey: wallet.privateKey,
    };

    document.getElementById("outputBox").innerHTML = `
      <p><strong>Mnemonic:</strong><br><textarea rows="2" readonly>${mnemonic}</textarea></p>
      <p><strong>ETH Address:</strong><br><code>${wallet.address}</code></p>
      <p><strong>Private Key:</strong><br><code>${wallet.privateKey}</code></p>
    `;
    document.getElementById("downloadBtn").style.display = "inline-block";
  } catch (err) {
    document.getElementById("outputBox").innerHTML = `<p style="color:red;">❌ Error: ${err.message}</p>`;
    document.getElementById("downloadBtn").style.display = "none";
  }
}

function downloadETHWallet() {
  if (!ethWallet) return;

  const text = `
ETH Wallet

Mnemonic:
${ethWallet.mnemonic}

Address:
${ethWallet.address}

Private Key:
${ethWallet.privateKey}
`;

  const blob = new Blob([text.trim()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "eth-wallet.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
