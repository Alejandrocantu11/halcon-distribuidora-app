// controllers/usersController.js
const pool = require("../database/db");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { nombre, correo, password } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      const [result] = await pool.query(
        "INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)",
        [nombre, correo, password]
      );
      res.json({ success: true, id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    try {
      await pool.query(
        "UPDATE users SET nombre = ?, correo = ? WHERE id = ?",
        [nombre, correo, id]
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM users WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
