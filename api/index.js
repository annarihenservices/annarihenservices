const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const serviceRouter = require("./routes/service.route.js");
const consultationRouter = require("./routes/consultation.route.js");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*",
    credentials: true,
  })
);

const expressServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

// Connect to the database
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/annaservice/users", userRouter);
app.use("/annaservice/auth", authRouter);
app.use("/annaservice/service", serviceRouter);
app.use("/annaservice/consultation", consultationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Start server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

