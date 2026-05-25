import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
setInterval(() => {
  const sql = `
    UPDATE orders
    SET Status = 'Đã xác nhận'
    WHERE Status = 'Đơn hàng mới'
    AND TIMESTAMPDIFF(MINUTE, Created_At, NOW()) >= 30
  `;

  db.query(sql);
}, 60000); 