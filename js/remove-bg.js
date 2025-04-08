let selectedImage = null;
const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');
const removeBtn = document.getElementById('removeBtn');
const previewImg = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

// Handle file input
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    loadImage(file);
  }
});

// Drag & drop support
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("highlight");
});
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("highlight");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("highlight");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    loadImage(file);
  }
});

// Paste from clipboard
window.addEventListener("paste", (e) => {
  const items = e.clipboardData.items;
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      loadImage(file);
    }
  }
});

// Load image into preview
function loadImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage = e.target.result;
    previewImg.src = selectedImage;
    downloadBtn.style.display = "none";
  };
  reader.readAsDataURL(file);
}

removeBtn.addEventListener("click", async () => {
  if (!selectedImage) {
    alert("Please upload an image first.");
    return;
  }

  try {
    removeBtn.textContent = "Removing...";
    removeBtn.disabled = true;

    const blob = await fetch(selectedImage).then(res => res.blob());
    const formData = new FormData();
    formData.append("image_file", blob, "input.png");

    const res = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "wLouGuqpqF3yHsBY9zeiJSGT" // ✅ your API key
      },
      body: formData
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Remove.bg error: ${res.status} - ${errorText}`);
    }

    const resultBlob = await res.blob();
    const resultUrl = URL.createObjectURL(resultBlob);

    previewImg.src = resultUrl;
    downloadBtn.href = resultUrl;
    downloadBtn.download = "no-bg.png";
    downloadBtn.style.display = "inline-block";

  } catch (err) {
    alert("❌ Error: " + err.message);
  } finally {
    removeBtn.textContent = "Remove Background";
    removeBtn.disabled = false;
  }
});

