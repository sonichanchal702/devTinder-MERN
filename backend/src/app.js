// app.js work:- Only boot the application and connect the db plus nevigate to the middleware for the api fetching

const express = require("express");
const cookieParser=require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");


const app = express();

// Global middleware
app.use(express.json());
app.use(cookieParser());


// require Routers
const authRouter=require("./routers/authRouter.js");
const profileRouter=require("./routers/profileRouter.js");
const reqRouter=require("./routers/reqRouter.js");

// using or mounting Routers
app.use(cors({
  origin: "http://localhost:5173", // frontend ka address
  credentials: true,               // cookies allow karo
}));

app.use("/users", authRouter);
app.use("/users", profileRouter);
app.use("/users", reqRouter);


// Health check (optional but common)
app.get("/", (req, res) => {
  res.send("API running");
});

// DB + Server
connectDB().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});

