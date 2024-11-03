const path = require("path");
const fs = require("fs").promises;

const multer = require("multer");

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const upload = multer({
  dest: path.join(__dirname, "uploads"), // Temporary directory for uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size: 5MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(docx)$/)) {
      return cb(new Error("Only DOCX files are allowed!"), false);
    }
    cb(null, true);
  },
});

const docx2pdf = [
  upload.single("docxFile"),
  async (req, res) => {
    const ext = req.file.originalname.split(".docx") + ".pdf";
    const inputPath = req.file.path;
    const outputPath = path.join(__dirname, `/uploads/${ext}`);

    const docxBuf = await fs.readFile(inputPath);

    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

    await fs.writeFile(outputPath, pdfBuf);
    await res.sendFile(outputPath);
    // fs.unlink(outputPath);

    return;
  },
  () => fs.unlink(outputPath),
];

module.exports = docx2pdf;
