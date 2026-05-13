import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      navigate('/login');
      return;
    }
    setUser(loggedUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const products = [
    { 
      id: 1, 
      name: "AirPods Pro 2", 
      price: 6500000, 
      oldPrice: 7500000, 
      sold: 1240, 
      stock: 45, 
      discount: 13, 
      isNew: true, 
      isBest: true,
      image: "https://images.unsplash.com/photo-1664271294066-2dfd418b15b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // ← Đổi ảnh ở đây
    },
    { 
      id: 2, 
      name: "Sony WH-1000XM5", 
      price: 10500000, 
      oldPrice: 12500000, 
      sold: 890, 
      stock: 22, 
      discount: 16, 
      isNew: false, 
      isBest: true,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"   // ← Đổi ảnh ở đây
    },
    { 
      id: 3, 
      name: "JBL Tune 760NC", 
      price: 2850000, 
      oldPrice: 3200000, 
      sold: 2340, 
      stock: 98, 
      discount: 11, 
      isNew: true, 
      isBest: false,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"   // ← Đổi ảnh ở đây
    },
  ];

  const ProductCard = ({ product }) => (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group"
    >
      {}
      <div className="h-72 bg-gray-100 overflow-hidden">
        <img 
          src={product.image || `https://picsum.photos/id/${100 + product.id}/400/300`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
          alt={product.name} 
        />
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-3xl font-bold text-indigo-600">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.oldPrice && (
            <span className="line-through text-gray-400 text-base">
              {product.oldPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        <p className="text-sm text-green-600 mt-2">
          Đã bán {product.sold} • Còn {product.stock}
        </p>
        <p className="text-xs text-gray-500 mt-3">{product.category || "Premium"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">AudioPro</h1>
          
          <div className="flex items-center gap-8 text-lg">
            <a href="/" className="hover:text-indigo-600 font-medium">Trang chủ</a>
            <a href="/products" className="hover:text-indigo-600 font-medium">Sản phẩm</a>
            
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

      {/* Hero */}
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

      {}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          🔥 Khuyến Mãi Hot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.filter(p => p.discount > 10).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl font-bold mb-8">🆕 Mới Nhất</h3>
            <div className="space-y-6">
              {products.filter(p => p.isNew).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-8">🏆 Bán Chạy Nhất</h3>
            <div className="space-y-6">
              {products.filter(p => p.isBest).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;