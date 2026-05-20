import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const autoUpdateStatus = (orderList) => {
    const updated = orderList.map(order => {
      if (order.status === "Đã hủy" || order.status === "Đã giao thành công") return order;

      const timePassed = Date.now() - order.createdAt;
      const minutesPassed = Math.floor(timePassed / 60000);

      let newStatus = order.status;

      if (minutesPassed >= 3) newStatus = "Đã giao thành công";
      else if (minutesPassed >= 2) newStatus = "Đang giao hàng";
      else if (minutesPassed >= 1) newStatus = "Shop đang chuẩn bị hàng";
      else if (minutesPassed >= 0.5) newStatus = "Đã xác nhận";

      return newStatus !== order.status ? { ...order, status: newStatus } : order;
    });

    if (JSON.stringify(updated) !== JSON.stringify(orderList)) {
      setOrders(updated);
      localStorage.setItem('orders', JSON.stringify(updated));
    }
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);


    const interval = setInterval(() => {
      autoUpdateStatus(savedOrders);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const openDetail = (order) => setSelectedOrder(order);
  const closeDetail = () => setSelectedOrder(null);

  const cancelOrder = (orderId) => {
    if (!window.confirm("Xác nhận hủy đơn hàng?")) return;
    const updated = orders.map(o => o.id === orderId ? { ...o, status: "Đã hủy" } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">📦 Đơn Hàng Của Tôi</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-2xl text-gray-500">Bạn chưa có đơn hàng nào</div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl shadow p-8 hover:shadow-2xl transition cursor-pointer" onClick={() => openDetail(order)}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-mono font-bold text-xl">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className={`px-6 py-3 rounded-2xl text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{order.customer.fullName} • {order.items.length} sản phẩm</p>
              </div>
            ))}
          </div>
        )}
      </div>


      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 max-h-[90vh] overflow-auto">
            <button onClick={closeDetail} className="float-right text-3xl text-gray-400">×</button>
            <h2 className="text-2xl font-bold mb-6">Chi tiết đơn hàng</h2>
            
            <p className="font-mono text-lg">{selectedOrder.id}</p>
            <p className="text-sm text-gray-500 mb-6">{selectedOrder.date}</p>

            <div className="mb-8">
              <p className="font-medium">Trạng thái: <span className="font-semibold">{selectedOrder.status}</span></p>
            </div>

            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            {selectedOrder.items.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b">
                <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt="" />
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="mt-8 text-2xl font-bold flex justify-between">
              <span>Tổng tiền</span>
              <span className="text-indigo-600">{selectedOrder.total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    "Đơn hàng mới": "bg-blue-100 text-blue-700",
    "Đã xác nhận": "bg-indigo-100 text-indigo-700",
    "Shop đang chuẩn bị hàng": "bg-yellow-100 text-yellow-700",
    "Đang giao hàng": "bg-purple-100 text-purple-700",
    "Đã giao thành công": "bg-green-100 text-green-700",
    "Đã hủy": "bg-red-100 text-red-700"
  };
  return colors[status] || "bg-gray-100";
};

export default Orders;