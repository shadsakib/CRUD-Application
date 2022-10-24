const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "BOOKBAG";

const UserModel = require("../models/User");

const register = async function (req, res) {
  const { username, password } = req.body;

  try {
    const userWithSameUsername = await UserModel.findOne({ username });

    if (userWithSameUsername) {
      res.status(400).json({
        message:
          "User with this username already exists. Try another username.",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const obj = await UserModel.create({ username, password: passwordHash });
    const token = jwt.sign({ username: obj.username, id: obj._id }, JWT_SECRET);

    res.status(200).json({ user: obj, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "There was a Server Side Error!" });
  }
};

const signIn = async function (req, res) {
  const { username, password } = req.body;

  try {
    const registeredUser = await UserModel.findOne({ username });
    if (!registeredUser) {
      res.status(200).json({ message: "User not registered" });
      return;
    }

    const matched = await bcrypt.compare(password, registeredUser.password);
    if (!matched) {
      res.status(200).json({ message: "Username and password did not match" });
      return;
    }

    const token = jwt.sign(
      { username: registeredUser.username, id: registeredUser._id },
      JWT_SECRET
    );

    res.status(200).json({ user: registeredUser, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "There was a Server Side Error!" });
  }
};

module.exports = { register, signIn };
