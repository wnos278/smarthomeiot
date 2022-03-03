const User = require("../model/user");
const safe = require("safe-await");
exports.putName = async (req, res) => {
  const { name, id } = req.body;

  const [error, user] = await safe(User.findById(id));
  if (error) {
    return console.log(error);
  }

  if (!user)
    return res.status(400).json({
      message: "User not found",
    });

  user.name = name;

  const [error2, response] = await safe(user.save());
  if (error2) {
    return console.log(error2);
  }

  res.status(200).json({
    id: response._id,
    name: response.name,
    phone: response.phone,
    email: response.email,
    logined: response.logined,
  });
};
