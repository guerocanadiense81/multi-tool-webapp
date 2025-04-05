function generateBarcode() {
  const value = document.getElementById("barcodeInput").value.trim();
  const type = document.getElementById("barcodeType").value;
  const svg = document.getElementById("barcodeSvg");
  const downloadLink = document.getElementById("downloadLink");

  if (!value) {
    alert("⚠️ Please enter a value.");
    return;
  }

  try {
    JsBarcode(svg, value, {
      format: type,
      lineColor: "#0f0",
      background: "#000",
      width: 2,
      height: 100,
      displayValue: true
    });

    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.style.display = "inline-block";

  } catch (err) {
    alert("❌ Error generating barcode: " + err.message);
  }
}
