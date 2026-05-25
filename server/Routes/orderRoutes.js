import express from 'express';
import db from '../config/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, (req, res) => {
  const userId = req.user.id; 
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Không có sản phẩm' });
  }

  let total = 0;
  items.forEach(i => {
    total += i.price * i.quantity;
  });

  const sqlOrder = `
    INSERT INTO orders (User_Id, Total, Status)
    VALUES (?, ?, ?)
  `;

  db.query(sqlOrder, [userId, total, 'Đơn hàng mới'], (err, result) => {
    if (err) return res.status(500).json(err);

    const orderId = result.insertId;

    const promises = items.map(i => {
      return new Promise((resolve, reject) => {
        const sqlItem = `
          INSERT INTO order_items (Order_Id, Product_Name, Quantity, Price)
          VALUES (?, ?, ?, ?)
        `;

        db.query(
          sqlItem,
          [orderId, i.productName, i.quantity, i.price],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    });

    Promise.all(promises)
      .then(() => {
        res.json({ message: 'Đặt hàng thành công', orderId });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});


router.get('/my-orders', verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT * FROM orders
    WHERE User_Id = ?
    ORDER BY Created_At DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


router.put('/update-status/:id', verifyToken, (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  if (!status) {
    return res.status(400).json({ message: 'Thiếu status' });
  }

  const sql = `
    UPDATE orders
    SET Status = ?
    WHERE Order_Id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json({ message: 'Cập nhật trạng thái thành công' });
  });
});


router.put('/cancel/:id', verifyToken, (req, res) => {
  const id = req.params.id;

  const sql = `
    UPDATE orders
    SET Status = 'Hủy đơn hàng'
    WHERE Order_Id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json({ message: 'Đã hủy đơn' });
  });
});

export default router;