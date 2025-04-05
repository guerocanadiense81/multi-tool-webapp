function generateDL() {
  const name = document.getElementById("name").value.toUpperCase().split(",");
  const dob = new Date(document.getElementById("dob").value);
  const out = document.getElementById("outputBox");

  if (name.length < 2 || isNaN(dob)) {
    out.innerHTML = "<p style='color:red;'>Enter full name and valid date.</p>";
    return;
  }

  const surname = name[0].trim().padEnd(5, '9').substring(0, 5);
  const year = dob.getFullYear().toString().slice(-2);
  const month = (dob.getMonth() + 1 + (dob.getDate() % 2 === 0 ? 50 : 0)).toString().padStart(2, '0');
  const day = dob.getDate().toString().padStart(2, '0');

  const dln = `${surname}${year}${month}${day}`;
  out.innerHTML = `<p><strong>DL Number:</strong> ${dln}</p>`;
}
