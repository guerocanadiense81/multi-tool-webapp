function validateCC() {
  const card = document.getElementById("ccInput").value.replace(/\\D/g, "");
  const out = document.getElementById("outputBox");

  function luhn(cc) {
    return cc.split('').reverse().map((d, i) => i % 2 ? (d * 2 > 9 ? d * 2 - 9 : d * 2) : +d)
             .reduce((sum, val) => sum + val, 0) % 10 === 0;
  }

  const valid = luhn(card);
  const type = card.startsWith("4") ? "Visa" : card.startsWith("5") ? "MasterCard" : "Unknown";

  out.innerHTML = valid
    ? `<p style='color:lime;'>✅ Valid ${type} card</p>`
    : `<p style='color:red;'>❌ Invalid card number</p>`;
}
