const fs = require("fs");
const Tesseract = require("tesseract.js"); // OCR library
const logger = require("../../common/logger");

const ocr = async (filePath) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(filePath, "eng"); // Recognize English text
    return text.trim();
  } catch (error) {
    logger.error(error);
    throw new Error("Error performing OCR");
  }
};

const extract_text = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const tt = await ocr(file.path);
    res.send(tt);

    await fs.promises.unlink(file.path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing image" });
  }
};

module.exports = extract_text;
