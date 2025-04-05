function generateDLN() {
  const lastName = document.getElementById("lastName").value.trim().toUpperCase();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const output = document.getElementById("outputBox");

  if (!lastName || !dob) {
    output.innerHTML = "<p style='color:red;'>Please enter a last name and date of birth.</p>";
    return;
  }

  // Surname code: first 3 letters + 2 digits (optional logic for full 5)
  let surnameCode = lastName.replace(/[^A-Z]/g, '').padEnd(5, '9').substring(0, 5);

  const birthDate = new Date(dob);
  const year = birthDate.getFullYear().toString().slice(-2);
  let month = birthDate.getMonth() + 1;
  if (gender === "F") month += 50;
  month = month.toString().padStart(2, '0');
  const day = birthDate.getDate().toString().padStart(2, '0');

  const dln = `${surnameCode}${year}${month}${day}`;

  output.innerHTML = `<p><strong>Generated Quebec DLN:</strong><br><code>${dln}</code></p>`;
}
