const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/authRouter.js");
const profileRouter = require("./routers/profileRouter.js");
const reqRouter = require("./routers/reqRouter.js");
const userRouter = require("./routers/user");
const paymentRouter = require("./routers/paymentRouter");

app.use("/users", paymentRouter);
app.use("/users", authRouter);
app.use("/users", profileRouter);
app.use("/users", reqRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Vibe API running");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChat", ({ userId, targetUserId }) => {
    const roomId = [userId, targetUserId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ userId, targetUserId, firstName, lastName, text }) => {
    const roomId = [userId, targetUserId].sort().join("_");
    const Chat = require("./model/Chat");

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
    }

    chat.messages.push({ senderId: userId, text });
    await chat.save();

    io.to(roomId).emit("messageReceived", { firstName, lastName, text });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

connectDB().then(() => {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});