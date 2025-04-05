function generateDLN() {
  const lastName = document.getElementById("lastName").value.trim().toUpperCase();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const output = document.getElementById("outputBox");

  if (!lastName || !dob) {
    output.innerHTML = "<p style='color:red;'>Please enter a last name and valid date.</p>";
    return;
  }

  const nameCode = quebecNameCode(lastName); // M6152

  const birthDate = new Date(dob);
  const year = birthDate.getFullYear().toString().slice(-2);
  let month = birthDate.getMonth() + 1;
  if (gender === "F") month += 50;
  const day = birthDate.getDate().toString().padStart(2, '0');
  const monthStr = month.toString().padStart(2, '0');

  const finalDLN = `${nameCode}-${day}${monthStr}${year}`;
  output.innerHTML = `<p><strong>DLN:</strong> <code>${finalDLN}</code></p>`;
}

function quebecNameCode(name) {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, '');
  let code = letters[0]; // First letter only

  const map = {
    A:'', E:'', I:'', O:'', U:'', H:'', W:'', Y:'',
    B:'1', F:'1', P:'1', V:'1',
    C:'2', G:'2', J:'2', K:'2', Q:'2', S:'2', X:'2', Z:'2',
    D:'3', T:'3',
    L:'4',
    M:'5', N:'5',
    R:'6'
  };

  let prevDigit = '';
  for (let i = 1; i < letters.length && code.length < 5; i++) {
    const digit = map[letters[i]] || '';
    if (digit !== prevDigit && digit !== '') {
      code += digit;
      prevDigit = digit;
    }
  }

  return code.padEnd(5, '9');
}
