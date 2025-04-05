function generateFakeData() {
  const names = ["John", "Alice", "Miguel", "Sofia", "Liam", "Emma"];
  const surnames = ["Smith", "Lopez", "Kim", "Nguyen", "Garcia", "Brown"];
  const domains = ["example.com", "test.org", "mail.net"];

  const name = names[Math.floor(Math.random() * names.length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const email = `${name.toLowerCase()}.${surname.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
  const phone = `+1-${Math.floor(Math.random()*900 + 100)}-${Math.floor(Math.random()*900 + 100)}-${Math.floor(Math.random()*9000 + 1000)}`;
  const sin = `${Math.floor(Math.random()*900 + 100)}-${Math.floor(Math.random()*90 + 10)}-${Math.floor(Math.random()*9000 + 1000)}`;
  const cc = `4${Math.floor(Math.random()*1000000000000000).toString().padStart(15, '0')}`;

  const output = `
    <p><strong>Name:</strong> ${name} ${surname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>SIN:</strong> ${sin}</p>
    <p><strong>Credit Card (VISA):</strong> ${cc}</p>
  `;
  document.getElementById("outputBox").innerHTML = output;
}
