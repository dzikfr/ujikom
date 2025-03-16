const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET summary dashboard
router.get("/", (req, res) => {
  const query = `
      SELECT 
        (SELECT COUNT(*) FROM customer) AS total_customers,
        (SELECT COUNT(*) FROM item) AS total_items,
        (SELECT COUNT(*) FROM sales) AS total_sales,
        (SELECT COUNT(*) FROM transaction) AS total_transactions
    `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]); // Karena hasilnya cuma satu row
  });
});

module.exports = router;
