import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


// ================= REGISTER =================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (User_Name, User_Email, User_Password)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.log('Register error:', err);
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: 'Đăng ký thành công' });
    });

  } catch (error) {
    console.log('Bcrypt error:', error);
    res.status(500).json({ message: 'Lỗi mã hóa password' });
  }
});


// ================= LOGIN =================
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE User_Email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log('Login error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    const user = result[0];

    // so sánh password
    const isMatch = await bcrypt.compare(password, user.User_Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    // tạo token
    const token = jwt.sign(
      { id: user.User_Id },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token
    });
  });
});


export default router;