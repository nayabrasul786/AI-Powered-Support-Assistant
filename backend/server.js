require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rateLimiter = require("./middleware/rateLimiter");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});