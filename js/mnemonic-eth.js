function generateMnemonic() {
  const phrase = bip39.generateMnemonic();
  document.getElementById("outputBox").innerHTML = `
    <p><strong>Mnemonic:</strong><br><code>${phrase}</code></p>
  `;
}
