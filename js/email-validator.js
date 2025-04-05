function validateEmail() {
  const email = document.getElementById("emailInput").value.trim();
  const result = document.getElementById("outputBox");

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email) {
    result.innerHTML = "<p style='color: orange;'>Please enter an email.</p>";
  } else if (emailRegex.test(email)) {
    result.innerHTML = `<p style='color: lime;'>✅ "${email}" is valid.</p>`;
  } else {
    result.innerHTML = `<p style='color: red;'>❌ "${email}" is not valid.</p>`;
  }
}
