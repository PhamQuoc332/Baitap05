import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3001/api/auth/register',
        {
          name,
          email,
          password
        }
      );

      console.log(res.data);

      alert('Đăng ký thành công!');

      navigate('/login');

    } catch (err) {
      console.log(err);

      setError('Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Đăng Ký Tài Khoản
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Họ và tên
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mật khẩu
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
          >
            Đăng Ký
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Đã có tài khoản?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;