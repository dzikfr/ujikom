const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// REGISTER
router.post("/register", (req, res) => {
  const { name_user, username, password } = req.body;

  // Hash password sebelum disimpan
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "INSERT INTO petugas (nama_user, username, password) VALUES (?, ?, ?)",
      [name_user, username, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM petugas WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // Cek password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        // Buat JWT Token
        const token = jwt.sign(
          { id: user.id_user, level: user.level ? user.level : null },
          SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.json({ message: "Login successful!", token });
      });
    }
  );
});

module.exports = router;
