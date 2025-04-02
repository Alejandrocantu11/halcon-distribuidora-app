// controllers/authController.js
const pool = require("../database/db");
const nodemailer = require("nodemailer");

module.exports = {
  login: async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE correo = ? AND password = ?",
        [correo, password]
      );
      if (rows.length > 0) {
        // Login exitoso
        return res.json({ success: true });
      } else {
        return res.json({ success: false, message: "Credenciales inválidas" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  register: async (req, res) => {
    const { nombre, correo, password } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    try {
      // Inserta en la DB
      await pool.query(
        "INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)",
        [nombre, correo, password]
      );

      // Enviar correo de bienvenida
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: "Bienvenido a Halcon Distribuidora",
        text: `Hola ${nombre}, gracias por registrarte.`,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
