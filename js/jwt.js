function decodeJWT() {
  const input = document.getElementById('jwtInput').value.trim();
  const [header, payload] = input.split('.');

  if (!header || !payload) {
    alert("Invalid JWT format.");
    return;
  }

  try {
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    document.getElementById('jwtHeader').textContent = JSON.stringify(decodedHeader, null, 2);
    document.getElementById('jwtPayload').textContent = JSON.stringify(decodedPayload, null, 2);
  } catch (err) {
    alert("Failed to decode JWT.");
  }
}
