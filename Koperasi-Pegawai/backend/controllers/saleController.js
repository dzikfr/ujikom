const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET semua sales
router.get("/", (req, res) => {
  db.query("SELECT * FROM sales LEFT JOIN customer ON sales.id_customer = customer.id_customer", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET sales by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM sales WHERE id_sale = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Sale not found" });
    res.json(results[0]);
  });
});

// CREATE sales baru
router.post("/", (req, res) => {
  const { tgl_sales, id_customer, do_number, status } = req.body;
  db.query(
    "INSERT INTO sales (tgl_sales, id_customer, do_number, status) VALUES (?, ?, ?, ?)",
    [tgl_sales, id_customer, do_number, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Sale created successfully!", id: result.insertId });
    }
  );
});

// UPDATE sales
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tgl_sales, id_customer, do_number, status } = req.body;
  db.query(
    "UPDATE sales SET tgl_sales = ?, id_customer = ?, do_number = ?, status = ? WHERE id_sale = ?",
    [tgl_sales, id_customer, do_number, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
      res.json({ message: "Sale updated successfully!" });
    }
  );
});

// DELETE sales
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM sales WHERE id_sale = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Sale not found" });
    res.json({ message: "Sale deleted successfully!" });
  });
});

module.exports = router;
