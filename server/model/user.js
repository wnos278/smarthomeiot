const mongoose = require("mongoose");
//json web token
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phone: {
    type: Number,
    required: true,
  },
  logined: {
    type: Boolean,
  },
  lastOnline: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// generate jwt token
UserSchema.methods.generateToken = async function () {
  try {
    let token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.TOKEN_SECRET
    );

    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("Users", UserSchema);

module.exports = User;
