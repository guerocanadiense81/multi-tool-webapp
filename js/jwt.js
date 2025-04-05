// Decode JWT
function decodeJWT() {
  const jwt = document.getElementById("jwtInput").value.trim();
  if (!jwt.includes(".")) return alert("Invalid JWT");

  const [header, payload] = jwt.split(".").slice(0, 2);
  try {
    document.getElementById("jwtHeader").textContent = JSON.stringify(JSON.parse(atob(header)), null, 2);
    document.getElementById("jwtPayload").textContent = JSON.stringify(JSON.parse(atob(payload)), null, 2);
  } catch {
    alert("❌ Invalid base64 content.");
  }
}

// Encode JWT
async function encodeJWT() {
  const payloadInput = document.getElementById("payloadInput").value;
  const secret = document.getElementById("secretInput").value;

  try {
    const payload = JSON.parse(payloadInput);
    const jwt = await jose.SignJWT.fromPayload(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(secret));

    document.getElementById("encodedOutput").value = jwt;
  } catch (e) {
    alert("❌ Error encoding JWT: " + e.message);
  }
}
