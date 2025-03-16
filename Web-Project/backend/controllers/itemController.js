const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET semua item
router.get("/", (req, res) => {
  db.query("SELECT * FROM item", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET item by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM item WHERE id_item = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json(results[0]);
  });
});

// CREATE item baru
router.post("/", (req, res) => {
  const { nama_item, uom, harga_beli, harga_jual } = req.body;
  db.query(
    "INSERT INTO item (nama_item, uom, harga_beli, harga_jual) VALUES (?, ?, ?, ?)",
    [nama_item, uom, harga_beli, harga_jual],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Item created successfully!", id: result.insertId });
    }
  );
});

// UPDATE item
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nama_item, uom, harga_beli, harga_jual } = req.body;
  db.query(
    "UPDATE item SET nama_item = ?, uom = ?, harga_beli = ?, harga_jual = ? WHERE id_item = ?",
    [nama_item, uom, harga_beli, harga_jual, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Item updated successfully!" });
    }
  );
});

// DELETE item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM item WHERE id_item = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully!" });
  });
});

module.exports = router;
