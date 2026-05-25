import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/add', (req, res) => {
  const { productName, quantity, price } = req.body;


  const userId = 1;

  const sql = `
    INSERT INTO cart (User_Id, Product_Name, Quantity, Price)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [userId, productName, quantity, price], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    res.json({ message: 'Đã thêm vào giỏ hàng' });
  });
});

export default router;