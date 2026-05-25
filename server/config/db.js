import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'audio_pro'
});

db.connect((err) => {
  if (err) {
    console.log('Lỗi DB:', err);
  } else {
    console.log('MySQL Connected');
  }
});

export default db;