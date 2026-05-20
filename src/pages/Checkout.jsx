import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      navigate('/cart');
    }
    setCart(savedCart);
  }, [navigate]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const newOrder = {
      id: "ORDER-" + Date.now(),
      customer: formData,
      items: cart,
      total: totalPrice,
      createdAt: Date.now(),
      status: "Đơn hàng mới",
      date: new Date().toLocaleString('vi-VN'),
      paymentMethod: "COD"
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');

    alert(`✅ Đặt hàng thành công!\nMã đơn hàng: ${newOrder.id}`);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
  
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-6">Thông tin giao hàng</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text" name="fullName" placeholder="Họ và tên *" 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
                className="w-full p-4 border rounded-2xl" 
              />
              <input 
                type="tel" name="phone" placeholder="Số điện thoại *" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
                className="w-full p-4 border rounded-2xl" 
              />
              <textarea 
                name="address" placeholder="Địa chỉ nhận hàng chi tiết *" 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required 
                rows={4} 
                className="w-full p-4 border rounded-2xl" 
              />
              <textarea 
                name="note" placeholder="Ghi chú cho shipper (không bắt buộc)" 
                value={formData.note} 
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                rows={3} 
                className="w-full p-4 border rounded-2xl" 
              />

              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl font-semibold rounded-2xl mt-4"
              >
                Đặt Hàng - Thanh toán khi nhận hàng (COD)
              </button>
            </form>
          </div>

      
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
            <div className="bg-white rounded-3xl shadow p-6 sticky top-24">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                </div>
              ))}
              <div className="flex justify-between text-2xl font-bold mt-6 pt-6 border-t">
                <span>Tổng thanh toán:</span>
                <span className="text-indigo-600">{totalPrice.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;