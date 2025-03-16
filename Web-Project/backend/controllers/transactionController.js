const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET semua transaksi
router.get("/", (req, res) => {
  db.query("SELECT * FROM transaction", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET transaksi by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM transaction WHERE id_transaction = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Transaction not found" });
    res.json(results[0]);
  });
});

// CREATE transaksi baru
router.post("/", (req, res) => {
  const { id_item, quantity, price } = req.body;
  const amount = quantity * price; // Hitung total amount
  db.query(
    "INSERT INTO transaction (id_item, quantity, price, amount) VALUES (?, ?, ?, ?)",
    [id_item, quantity, price, amount],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Transaction created successfully!", id: result.insertId });
    }
  );
});

// UPDATE transaksi
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { id_item, quantity, price } = req.body;
  const amount = quantity * price;
  db.query(
    "UPDATE transaction SET id_item = ?, quantity = ?, price = ?, amount = ? WHERE id_transaction = ?",
    [id_item, quantity, price, amount, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Transaction not found" });
      res.json({ message: "Transaction updated successfully!" });
    }
  );
});

// DELETE transaksi
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM transaction WHERE id_transaction = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted successfully!" });
  });
});

module.exports = router;
