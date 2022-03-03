const User = require("../model/user");
//hashing
const bcrypt = require("bcryptjs");

/**
 *
 * @param {*} req
 * @param {*} res
 * Signin user
 */
exports.signin = async (req, res) => {
  //check user

  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists) {
      return res.status(404).json("Invalid Credentials");
    }

    //passord check
    const checkPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!checkPassword) {
      return res.status(404).json("Invalid Credentials");
    }

    //jwt token
    const token = await userExists.generateToken();

    await userExists.updateOne({
      logined: true,
    });

    res.status(200).json({
      message: "Login Succesfull",
      token: token,
    });

    // res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong Try again",
    });
  }
};

/**
 * Signup new user
 * @param {*} req
 * @param {*} res
 */
exports.signup = async (req, res) => {
  //check if user already exists in db or not

  try {
    console.log("Receig user", req.body);
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(409).json({
        message: "User already exsist",
      });
    }

    //passord hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user object
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPassword,
    });

    //save new user in database
    const result = await user.save();

    res.status(200).json({
      message: "Your account is being Created succesfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong Try again",
    });
  }
};

/**
 * send user data on login
 * @param {*} req
 * @param {*} res
 */
exports.chat = async (req, res) => {
  res.status(200).json({
    id: req.authUser._id,
    name: req.authUser.name,
    phone: req.authUser.phone,
    email: req.authUser.email,
    avatar: req.authUser.avatar,
    logined: req.authUser.logined,
  });
};

/**
 * logout user on disocnnect and set logined to false
 * @param {*} req
 * @param {*} res
 */
exports.logout = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const user = await User.findById(id);
    user.logined = false;
    user.lastOnline = Date.now();
    await user.save();

    res.status(200).json({
      lastOnline: user.lastOnline,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
