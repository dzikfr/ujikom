const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET semua customer
router.get("/", (req, res) => {
  db.query("SELECT * FROM customer", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET customer by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM customer WHERE id_customer = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Customer not found" });
      res.json(results[0]);
    }
  );
});

// CREATE customer baru
router.post("/", (req, res) => {
  const { nama_customer, alamat, telp, fax, email } = req.body;
  db.query(
    "INSERT INTO customer (nama_customer, alamat, telp, fax, email) VALUES (?, ?, ?, ?, ?)",
    [nama_customer, alamat, telp, fax, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
          message: "Customer created successfully!",
          id: result.insertId,
        });
    }
  );
});

// UPDATE customer
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nama_customer, alamat, telp, fax, email } = req.body;
  db.query(
    "UPDATE customer SET nama_customer = ?, alamat = ?, telp = ?, fax = ?, email = ? WHERE id_customer = ?",
    [nama_customer, alamat, telp, fax, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Customer not found" });
      res.json({ message: "Customer updated successfully!" });
    }
  );
});

// DELETE customer
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM customer WHERE id_customer = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Customer not found" });
      res.json({ message: "Customer deleted successfully!" });
    }
  );
});

module.exports = router;
