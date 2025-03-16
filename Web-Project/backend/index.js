const express = require("express");
const app = express();
const authRoutes = require("./controllers/auth");
const itemRoutes = require("./controllers/itemController");
const customerRoutes = require("./controllers/customerController");
const transactionRoutes = require("./controllers/transactionController");
const saleRoutes = require("./controllers/saleController");
const dashboardRoutes = require("./controllers/dashboard");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log("Running on port 3000");
});
