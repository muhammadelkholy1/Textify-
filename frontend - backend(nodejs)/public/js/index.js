function uploadImage() {
  const fileInput = document.getElementById("customFile");

  if (fileInput.files.length === 0) {
    alert("Please select an image file to upload.");
    console.error("no file selected");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("avatar", file);

  fetch("http://127.10.10.10:3000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      const container = document.getElementById("extractedText");
      container.textContent = data;
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    });
}
function translateText() {
  const englishText = document.getElementById("extractedText").textContent;

  if (englishText == "") {
    alert("no text");
    console.error("not text");
    return;
  }

  fetch("http://127.10.10.10:3000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: englishText }),
  })
    .then((response) => response.text())
    .then((data) => {
      const textElement = document.getElementById("extractedText");
      textElement.textContent = data;
    })
    .catch((error) => {
      console.error("An error occured during translation", error);
      alert("An error occured during translation");
    });
}

const submitButton = document.getElementById("ocr-btn");
submitButton.addEventListener("click", uploadImage);

const translatButton = document.getElementById("translate-btn");
translatButton.addEventListener("click", translateText);
