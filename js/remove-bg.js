async function removeBackground() {
  const file = document.getElementById("upload").files[0];
  if (!file) return alert("Upload an image first.");

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "wLouGuqpqF3yHsBY9zeiJSGT" }, // Replace with actual key
    body: formData
  });

  if (!res.ok) return alert("Failed to remove background");

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  document.getElementById("preview").src = url;
}
