async function generateMnemonic() {
  const bip39 = window.bip39;
  const ethers = window.ethers;

  const mnemonic = bip39.generateMnemonic();
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  document.getElementById("outputBox").innerHTML = `
    <p><strong>Mnemonic:</strong><br><textarea rows="2" readonly>${mnemonic}</textarea></p>
    <p><strong>ETH Address:</strong><br><code>${wallet.address}</code></p>
    <p><strong>Private Key:</strong><br><code>${wallet.privateKey}</code></p>
  `;
}
