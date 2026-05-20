import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const allProducts = [
      { 
        id: 1, 
        name: "AirPods Pro 2", 
        price: 6500000, 
        oldPrice: 7500000, 
        stock: 45, 
        sold: 1240, 
        category: "Premium",
        images: ["https://images.unsplash.com/photo-1606741965326-cb990ae01bb2"]
      },
      { 
        id: 2, 
        name: "Sony WH-1000XM5", 
        price: 10500000, 
        oldPrice: 12500000, 
        stock: 22, 
        sold: 890, 
        category: "Premium",
        images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"]
      },
      { 
        id: 3, 
        name: "JBL Tune 760NC", 
        price: 2850000, 
        oldPrice: 3200000, 
        stock: 98, 
        sold: 2340, 
        category: "Mid-range",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
      },
      { 
        id: 4, 
        name: "Samsung Galaxy Buds 3", 
        price: 4200000, 
        oldPrice: 4900000, 
        stock: 67, 
        sold: 1560, 
        category: "Mid-range",
        images: ["https://images.unsplash.com/photo-1600374917838-1df876d745c7"]
      },
      { 
        id: 5, 
        name: "Bose QuietComfort Ultra", 
        price: 8900000, 
        oldPrice: 10500000, 
        stock: 18, 
        sold: 650, 
        category: "Premium",
        images: [
          "https://images.unsplash.com/photo-1657223143975-d29d7959a70f",
          "https://images.unsplash.com/photo-1674658556545-f18d4080ab6c"
        ]
      },
      { 
        id: 6, 
        name: "Apple AirPods Max", 
        price: 13500000, 
        oldPrice: 14500000, 
        stock: 15, 
        sold: 420, 
        category: "Premium",
        images: ["https://images.unsplash.com/photo-1628329567705-f8f7150c3cff"]
      },
      { 
        id: 7, 
        name: "Anker Soundcore Q35", 
        price: 1850000, 
        oldPrice: 2200000, 
        stock: 120, 
        sold: 1890, 
        category: "Mid-range",
        images: ["https://images.unsplash.com/photo-1765279302883-68bc58059bf4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QW5rZXIlMjBTb3VuZGNvcmV8ZW58MHx8MHx8fDA%3D"]
      },
      { 
        id: 8, 
        name: "Beats Studio Pro", 
        price: 7500000, 
        oldPrice: 8500000, 
        stock: 35, 
        sold: 980, 
        category: "Premium",
        images: ["https://images.unsplash.com/photo-1689357639029-f9397ac24b6a"]
      },
      { 
        id: 9, 
        name: "OneOdio Pro 10", 
        price: 5200000, 
        oldPrice: 5800000, 
        stock: 55, 
        sold: 1450, 
        category: "Premium",
        images: ["https://cdni.dienthoaivui.com.vn/x,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/tai-nghe-chup-tai-co-day-oneodio-pro-10-pbl-1.jpg"]
      },
      { 
        id: 10, 
        name: "Marshall Major IV", 
        price: 3200000, 
        oldPrice: 3800000, 
        stock: 80, 
        sold: 780, 
        category: "Mid-range",
        images: ["https://images.unsplash.com/photo-1602833703296-0b79f0b08b0e"]
      },
    ];

    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const similarProducts = allProducts.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setSimilar(similarProducts);
    }
  }, [id]);

  if (!product) return <div className="text-center py-20 text-2xl">Sản phẩm không tồn tại</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 text-indigo-600 hover:underline flex items-center gap-2 text-lg"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden aspect-square flex items-center justify-center border p-6">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-full"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <img 
                  src={img} 
                  className="max-w-full max-h-full object-contain" 
                  alt={product.name} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-indigo-600">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.oldPrice && (
              <span className="text-2xl line-through text-gray-400">
                {product.oldPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          <div className="flex gap-6 text-lg">
            <p><strong>Danh mục:</strong> {product.category}</p>
            <p><strong>Đã bán:</strong> {product.sold} chiếc</p>
          </div>

          <p className={`inline-block px-5 py-2 rounded-full text-lg font-medium
            ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
          </p>

          <div className="flex items-center gap-6">
            <span className="text-lg font-medium">Số lượng:</span>
            <div className="flex items-center border rounded-2xl">
              <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-12 h-12 text-2xl hover:bg-gray-100 rounded-l-2xl">-</button>
              <input type="text" value={quantity} readOnly className="w-16 text-center text-xl" />
              <button onClick={() => setQuantity(quantity+1)} className="w-12 h-12 text-2xl hover:bg-gray-100 rounded-r-2xl">+</button>
            </div>
          </div>

          <button 
  onClick={() => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = currentCart.findIndex(item => item.id === product.id);

    if (existing !== -1) {
      currentCart[existing].quantity += quantity;
    } else {
      currentCart.push({ ...product, quantity: quantity, image: product.images[0] });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
  }}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-xl font-semibold rounded-2xl transition"
>
  Thêm vào giỏ hàng
</button>

          {similar.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-4">Sản phẩm tương tự</h3>
              <div className="grid grid-cols-2 gap-4">
                {similar.map(p => (
                  <div key={p.id} 
                       onClick={() => navigate(`/product/${p.id}`)} 
                       className="cursor-pointer border rounded-xl p-3 hover:border-indigo-500 transition">
                    <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={p.images[0]} 
                        className="max-h-full max-w-full object-contain" 
                        alt={p.name} 
                      />
                    </div>
                    <p className="font-medium mt-3 text-center">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;