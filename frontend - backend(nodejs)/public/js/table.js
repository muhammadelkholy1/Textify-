function tableocr() {
  const fileInput = document.getElementById("customFile");

  if (fileInput.files.length === 0) {
    alert("Please select an image file to upload.");
    console.error("no file selected");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", file);

  fetch("http://127.10.10.10:8000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      data = data.replace(/\\"/g, "'").replace(/"/g, "");
      console.log(data);
      const ocrdiv = document.getElementById("ocr.div");
      ocrdiv.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    });
}

const submitButton = document.getElementById("ocr-btn");
submitButton.addEventListener("click", tableocr);
