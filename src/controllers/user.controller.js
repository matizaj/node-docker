const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("user not found");
    }
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send("logged in");
    } else {
      res.status(401).send("no authenticate");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
