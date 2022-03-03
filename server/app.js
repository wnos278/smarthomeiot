const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const safe = require("safe-await");
const path = require("path");
const User = require("./model/user");
const Message = require('./model/message');

const app = express();
app.use(bodyParser.json());
app.use("/public/", express.static(path.join(__dirname, "public")));
dotenv.config({ path: "./config.env" });
const URL = process.env.URL;

app.use(cors({ credentials: true, origin: URL }));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(cookieParser());

// databse connecti
require("./db/conn");

//Routes
const authRoutes = require("./routes/auth");
const messageRouter = require("./routes/messages");
app.get("/", (req, res) => {
  res.json("Api");
});

app.use("/auth", authRoutes);
app.use("/messages", messageRouter);
// Env variables
const PORT = process.env.PORT;

// connection
const server = app.listen(PORT, () => console.log(`Listening port ${PORT}`));
const io = new Server(server, { cors: { origin: URL } });

const sockets = [];
io.on("connection", function (socket) {
  console.log("socket connected : " + socket.id);
  socket.on("user", async (user) => {
    console.log("user: ", user);
    if (user.email && socket.id) {
      const emailExists = sockets.findIndex((obj) => obj.email === user.email);

      if (emailExists >= 0) {
        sockets[emailExists].id = socket.id;
        const [error, user] = await safe(
          User.findOne({
            email: sockets[emailExists].email,
          })
        );
        if (error) throw new Error(error);

        user.logined = true;

        const [error2, res] = await safe(user.save());
        if (error2) throw new Error(error2);
      } else {
        const [error, userData] = await safe(
          User.findOne({
            email: user.email,
          })
        );
        if (error) throw new Error(error);

        userData.logined = true;

        const [error2, res] = await safe(userData.save());
        if (error2) throw new Error(error2);
        sockets.push({
          id: socket.id,
          email: user.email,
        });
      }
    }
    io.emit("logined");
  });

  socket.on("room", (room) => {
    console.log("new room " + room);
    socket.join(room);
  });

  // emit socket when user send message to others or singlw user with help of room id
  socket.on("chat", (message) => {
    socket.to(message.room).emit("recevied", message);
  });
  
  socket.on("update-temp", async () => {
    let homeinfo = await Message.getLastestRoomInfo();
    socket.emit("update-homeinfo", homeinfo);
  })

  socket.on("disconnect", function () {
    console.log("users 1 " + sockets);
    console.log(socket.id + " : disconnected");
    const index = sockets.findIndex((obj) => obj.id === socket.id);
    console.log(socket.id + " : disconnected again" + "index " + index);
    console.log("users 2" + sockets);

    if (index >= 0) {
      User.findOneAndUpdate(
        { email: sockets[index].email },
        {
          logined: false,
          lastOnline: Date.now(),
        },
        { new: true }
      )
        .then((user) => {
          console.log(user.logined);
          sockets.splice(index, 1);
        })

        .catch((err) => console.log(err));

      console.log("save");
    }

    io.emit("logout");
  });
});
