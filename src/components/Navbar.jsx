import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) setUser(loggedUser);

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 
          className="text-3xl font-bold text-indigo-600 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          AudioPro
        </h1>

        <div className="flex items-center gap-8 text-lg">
          <a href="/" className="hover:text-indigo-600 font-medium">Trang chủ</a>
          <a href="/products" className="hover:text-indigo-600 font-medium">Sản phẩm</a>

          <div 
            onClick={() => navigate('/cart')}
            className="relative cursor-pointer hover:text-indigo-600 text-2xl transition"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span>Xin chào, <strong className="text-indigo-600">{user.name}</strong></span>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl transition"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;