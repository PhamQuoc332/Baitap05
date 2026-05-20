import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Home = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      navigate('/login');
      return;
    }
    setUser(loggedUser);


    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

   
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 1000); 

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };


  const products = [
    { id: 1, name: "AirPods Pro 2", price: 6500000, oldPrice: 7500000, sold: 1240, stock: 45, category: "Premium", image: "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2" },
    { id: 2, name: "Sony WH-1000XM5", price: 10500000, oldPrice: 12500000, sold: 890, stock: 22, category: "Premium", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb" },
    { id: 3, name: "JBL Tune 760NC", price: 2850000, oldPrice: 3200000, sold: 2340, stock: 98, category: "Mid-range", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
    { id: 4, name: "Samsung Galaxy Buds 3", price: 4200000, oldPrice: 4900000, sold: 1560, stock: 67, category: "Mid-range", image: "https://images.unsplash.com/photo-1600374917838-1df876d745c7" },
    { id: 5, name: "Bose QuietComfort Ultra", price: 8900000, oldPrice: 10500000, sold: 650, stock: 18, category: "Premium", image: "https://images.unsplash.com/photo-1657223143975-d29d7959a70f" },
    { id: 6, name: "Apple AirPods Max", price: 13500000, oldPrice: 14500000, sold: 420, stock: 15, category: "Premium", image: "https://images.unsplash.com/photo-1628329567705-f8f7150c3cff" },
    { id: 7, name: "Anker Soundcore Q35", price: 1850000, oldPrice: 2200000, sold: 1890, stock: 120, category: "Mid-range", image: "https://images.unsplash.com/photo-1765279302883-68bc58059bf4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QW5rZXIlMjBTb3VuZGNvcmV8ZW58MHx8MHx8fDA%3D" },
    { id: 8, name: "Beats Studio Pro", price: 7500000, oldPrice: 8500000, sold: 980, stock: 35, category: "Premium", image: "https://images.unsplash.com/photo-1689357639029-f9397ac24b6a" },
    { id: 9, name: "OneOdio Pro 10", price: 5200000, oldPrice: 5800000, sold: 1450, stock: 55, category: "Premium", image: "https://cdni.dienthoaivui.com.vn/x,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/tai-nghe-chup-tai-co-day-oneodio-pro-10-pbl-1.jpg" },
    { id: 10, name: "Marshall Major IV", price: 3200000, oldPrice: 3800000, sold: 780, stock: 80, category: "Mid-range", image: "https://images.unsplash.com/photo-1602833703296-0b79f0b08b0e" },
  ];

  const bestSellers = [...products].sort((a, b) => b.sold - a.sold);
  const mostViewed = [...products].sort((a, b) => b.sold * 1.3 - a.sold * 1.3);

  const ProductCard = ({ product }) => (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group min-w-[270px]"
    >
      <div className="h-64 bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
          alt={product.name} 
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-bold text-indigo-600">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.oldPrice && (
            <span className="line-through text-gray-400 text-sm">
              {product.oldPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>
        <p className="text-sm text-green-600 mt-1">Đã bán {product.sold}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">AudioPro</h1>
          
          <div className="flex items-center gap-8 text-lg">
            <a href="/" className="hover:text-indigo-600 font-medium">Trang chủ</a>
            <a href="/products" className="hover:text-indigo-600 font-medium">Sản phẩm</a>


            <div 
              onClick={() => navigate('/cart')}
              className="relative cursor-pointer hover:text-indigo-600 transition text-2xl"
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


      <section className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white py-28 text-center">
        <h2 className="text-5xl font-bold mb-6">Tai Nghe Không Dây Cao Cấp</h2>
        <p className="text-2xl mb-10">Trải nghiệm âm thanh studio - Giảm đến 30% cho thành viên</p>
        <button 
          onClick={() => navigate('/products')} 
          className="bg-white text-indigo-700 px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-100 transition"
        >
          Mua Ngay
        </button>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">🔥 Khuyến Mãi Hot</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">🏆 Top 10 Sản Phẩm Bán Chạy Nhất</h3>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">👁️ Top Sản Phẩm Xem Nhiều Nhất</h3>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
          {mostViewed.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;