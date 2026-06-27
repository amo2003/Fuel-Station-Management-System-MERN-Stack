require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const Memberrouter = require("./Routes/MemberRoutes");
const Stockrouter = require("./Routes/StockRoutes");
const salesRoutes = require("./Routes/sales");
const fuelPriceRoutes = require('./Routes/fuelPriceRoutes');
const fuelpaymentRoutes = require('./Routes/FuelPaymentRoutes');
const factory = require('./Routes/Factory');
const ev = require('./Routes/EVRoutes');
const Appoinment = require('./Routes/AppoinmentRoutes');
const EVpayment = require('./Routes/EVPaymentRoutes');
const RatingRoutes = require("./Routes/RatingRoutes");
const combinedRoutes = require("./Routes/EVCombinedRoutes");
const bulkOrderRoutes = require('./Routes/BulkOrderRoutes');
const paymentRoutes = require("./Routes/BulkincomeRoutes");
const FeedbackRoutes = require("./Routes/FeedbackRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const SupplierRoutes = require("./Routes/SupplierRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");

const initSocket = require("./Controllers/socket");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    /\.vercel\.app$/,
    /\.choreoapis\.dev$/
  ],
  credentials: true
}));

app.use("/Members", Memberrouter);
app.use("/Stocks", Stockrouter);
app.use("/sales", salesRoutes);
app.use('/fuelprices', fuelPriceRoutes);
app.use("/fuelpayments", fuelpaymentRoutes);
app.use("/factory", factory);
app.use("/ev", ev);
app.use("/appoinment", Appoinment);
app.use("/evpayment", EVpayment);
app.use("/rating", RatingRoutes);
app.use("/evcombined", combinedRoutes);
app.use('/api/bulkorders', bulkOrderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/feedbacks", FeedbackRoutes);
app.use("/api/chat", chatRoutes);
app.use("/suppliers", SupplierRoutes);
app.use("/admin", AdminRoutes);


app.use("/files", express.static("files"));


// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Initialize Socket.io for live chat
initSocket(io);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000} with Socket.io enabled`);
});


const md5 = require('md5');

const MERCHANT_ID = process.env.MERCHANT_ID;
const MERCHANT_SECRET = process.env.MERCHANT_SECRET; 

app.post('/getPayhereHash', (req, res) => {
  const { order_id, amount, currency } = req.body;
  if (!order_id || !amount || !currency) return res.status(400).send("Missing params");

  const hash = md5(
    MERCHANT_ID +
    order_id +
    parseFloat(amount).toFixed(2) +
    currency +
    md5(MERCHANT_SECRET).toUpperCase()
  ).toUpperCase();

  res.json({ hash });
});

