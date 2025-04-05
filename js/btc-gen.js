function generateBTC() {
  const bitcoin = window.bitcoinjs;
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const wif = keyPair.toWIF();

  document.getElementById("outputBox").innerHTML = `
    <p><strong>Address:</strong> <code>${address}</code></p>
    <p><strong>Private Key (WIF):</strong> <code>${wif}</code></p>
  `;
}
