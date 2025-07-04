
const express = require("express");
const mongoose = require("mongoose");
const Memberrouter = require("./Routes/MemberRoutes");
const Stockrouter = require("./Routes/StockRoutes");
const salesRoutes = require("./Routes/sales");
const fuelPriceRoutes = require('./Routes/fuelPriceRoutes'); // ✅ Import

const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/Members", Memberrouter);
app.use("/Stocks", Stockrouter);
app.use("/sales", salesRoutes);
app.use('/fuelprices', fuelPriceRoutes);




app.use("/files", express.static("files"));


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.ndjygyf.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));