const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const customerRoute = require("./src/user/user.routes");
const logger = require("./src/common/logger");
const ocrRoute = require("./src/services/ocr/ocr.routes");
const translationRoute = require("./src/services/translate/translate.routes");
const fileconvertRoute = require("./src/services/fileconvertor/fileconvertor.routes");

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ROUTES */
app.use("/user", customerRoute);

app.use("/upload", ocrRoute);
app.use("/translate", translationRoute);
app.use("/convert", fileconvertRoute);

app.use((err, req, res, next) => {
  logger.error(err);
  res.send({ error: err.message });
});

module.exports = app;
