import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, newQty) => {
    const updated = cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">🛒 Giỏ Hàng Của Bạn</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-400 mb-8">Giỏ hàng trống</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/products')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-lg font-medium transition"
              >
                Tiếp tục mua sắm
              </button>

              <button 
                onClick={() => navigate('/orders')}
                className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 rounded-2xl text-lg font-medium transition"
              >
                Xem đơn hàng đã mua
              </button>
            </div>
          </div>
        ) : (
          <>
         
            <div className="space-y-6 mb-10">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow flex gap-6 items-center">
                  <img src={item.image} className="w-28 h-28 object-cover rounded-2xl" alt="" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">{item.price.toLocaleString('vi-VN')}₫</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex border rounded-2xl">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-12 h-12 text-2xl">-</button>
                      <span className="w-14 text-center text-xl pt-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-12 h-12 text-2xl">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Xóa</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="flex justify-between text-3xl font-bold mb-8">
                <span>Tổng tiền:</span>
                <span className="text-indigo-600">{totalPrice.toLocaleString('vi-VN')}₫</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-xl font-semibold rounded-2xl transition"
                >
                  Tiến hành thanh toán
                </button>

                <button 
                  onClick={() => navigate('/orders')}
                  className="bg-gray-800 hover:bg-gray-900 text-white py-6 text-xl font-semibold rounded-2xl transition"
                >
                  Xem đơn hàng đã mua
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;