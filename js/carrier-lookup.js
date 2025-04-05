const gateways = {
  verizon: "vtext.com",
  att: "txt.att.net",
  tmobile: "tmomail.net",
  sprint: "messaging.sprintpcs.com"
};

function lookupCarrier() {
  const phone = document.getElementById("phoneInput").value.trim().replace(/\\D/g, "");
  const out = document.getElementById("outputBox");

  if (phone.length !== 10) {
    out.innerHTML = "<p style='color:red;'>Please enter a valid 10-digit number.</p>";
    return;
  }

  const guess = phone.startsWith("201") ? "Verizon" : phone.startsWith("214") ? "AT&T" : phone.startsWith("305") ? "T-Mobile" : "Unknown";
  const domain = gateways[guess.toLowerCase()] || "Unavailable";
  const smsEmail = domain !== "Unavailable" ? `${phone}@${domain}` : "N/A";

  out.innerHTML = `
    <p><strong>Carrier:</strong> ${guess}</p>
    <p><strong>Email-to-SMS:</strong> <code>${smsEmail}</code></p>
  `;
}
