function generateQR() {
  const input = document.getElementById('qrInput').value.trim();
  const size = parseInt(document.getElementById('qrSize').value);
  const canvas = document.getElementById('qrCanvas');
  const downloadLink = document.getElementById('downloadLink');

  if (!input) {
    alert('⚠️ Please enter text or a URL.');
    return;
  }

  // Generate QR code
  const qr = new QRious({
    element: canvas,
    value: input,
    size: size || 256,
    background: 'transparent',
    foreground: '#000'
  });

  // Set download link
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.style.display = 'inline-block';
}
