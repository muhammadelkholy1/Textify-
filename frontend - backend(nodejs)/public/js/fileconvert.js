document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  if (!document.querySelector('input[type="file"]').files[0]) {
    return;
  }
  const file = document.querySelector('input[type="file"]').files[0];
  formData.append("docxFile", file);

  fetch("/convert/docx-to-pdf", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.split(".")[0] + ".pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
});

