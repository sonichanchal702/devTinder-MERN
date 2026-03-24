const express = require("express");
const http = require("http");  // ← add karo
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// CORS — sabse pehle
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Global middleware
app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./routers/authRouter.js");
const profileRouter = require("./routers/profileRouter.js");
const reqRouter = require("./routers/reqRouter.js");
const userRouter = require("./routers/user");

app.use("/users", authRouter);
app.use("/users", profileRouter);
app.use("/users", reqRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("API running");
});

// Socket
  io.on("connection", (socket) => {
  socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
    const roomId = [userId, targetUserId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ userId, targetUserId, firstName, lastName, text }) => {
    const roomId = [userId, targetUserId].sort().join("_");
    
    // DB mein save karo
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
  console.log("User connected:", socket.id);
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// DB + Server
connectDB().then(() => {
  server.listen(8080, () => {  // ← server.listen karo app.listen nahi!
    console.log("Server running on port 8080");
  });
});