const translate = require("translate-google");

const translator = (req, res, next) => {
  const english_text = req.body.text;

  translate(english_text, { to: "ar", except: ["a"] })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = translator;
