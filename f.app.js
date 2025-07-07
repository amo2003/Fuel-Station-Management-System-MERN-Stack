// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables

// Route Imports
const Memberrouter = require("./Routes/MemberRoutes");
const Stockrouter = require("./Routes/StockRoutes");
const salesRoutes = require("./Routes/sales");
const fuelPriceRoutes = require('./Routes/fuelPriceRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static file handling
app.use("/files", express.static("files"));

// Routes
app.use("/Members", Memberrouter);
app.use("/Stocks", Stockrouter);
app.use("/sales", salesRoutes);
app.use("/fuelprices", fuelPriceRoutes);

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => console.error("❌ MongoDB connection failed:", err));
