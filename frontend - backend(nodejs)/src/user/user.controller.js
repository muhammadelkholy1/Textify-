const bcrypt = require("bcryptjs");

const User = require("./user.model");

const { generateAccessToken } = require("../common/jwt");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const alreadyExists = await User.findOne({ email: email }).exec();
    if (alreadyExists) {
      res.status(409);
      throw Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) throw Error("server error");
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const accessToken = generateAccessToken(
      { _id: user._id },
      process.env.TOKEN_SECRET
    );

    res.status(201).send({
      message: "success",
      accessToken: accessToken,
    });
  } catch (err) {
    res.status(res.statusCode || 500);
    next(err);
  }
};
