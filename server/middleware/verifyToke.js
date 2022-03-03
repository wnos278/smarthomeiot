const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);

    const authUser = await User.findOne({
      _id: verify._id,
      "tokens.token": token,
    });

    if (!authUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.authUser = authUser;
    req.userId = authUser._id;

    next();
  } catch (err) {
    res.status(400).send("token Invalid");
  }
};

module.exports = auth;
