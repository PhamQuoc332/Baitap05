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
        images: [
          "https://images.unsplash.com/photo-1644746339778-0d11db89d797?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1664271294066-2dfd418b15b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1611864528242-2b79d5d92490?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      },
      { 
        id: 2, 
        name: "Sony WH-1000XM5", 
        price: 10500000, 
        oldPrice: 12500000, 
        stock: 22, 
        sold: 890, 
        category: "Premium",
        images: ["https://images.unsplash.com/photo-1755719401938-35c1b24f6d15?q=80&w=1642&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1612858249816-5a91a9fb9886?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
      },
      { 
        id: 3, 
        name: "JBL Tune 760NC", 
        price: 2850000, 
        oldPrice: 3200000, 
        stock: 98, 
        sold: 2340, 
        category: "Mid-range",
        images: ["https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1642743200874-4675e7752cdb?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
      },
      { 
      id: 4, 
      name: "Samsung Galaxy Buds 3 Pro", 
      price: 4200000, 
      oldPrice: 4900000, 
      stock: 67, 
      sold: 1560, 
      category: "Mid-range",
      images: ["https://images.unsplash.com/photo-1705825859831-1fc8459c2d9c?q=80&w=1802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
    },
    { 
      id: 5, 
      name: "Bose QuietComfort Ultra", 
      price: 8900000, 
      oldPrice: 10500000, 
      stock: 18, 
      sold: 650, 
      category: "Premium",
      images: ["https://images.unsplash.com/photo-1657223143975-d29d7959a70f?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1674658556545-f18d4080ab6c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
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
        className="mb-8 text-indigo-600 hover:underline flex items-center gap-2"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     

<div className="bg-white rounded-3xl shadow-2xl overflow-hidden aspect-square border">
  <Swiper
    modules={[Navigation, Pagination]}
    pagination={{ clickable: true }}
    navigation
    className="w-full h-full"
  >
    {product.images.map((img, index) => (
      <SwiperSlide key={index} className="relative w-full h-full">
        <img 
          src={img} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={product.name} 
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
        {}
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

          {}
          <div className="flex items-center gap-6">
            <span className="text-lg font-medium">Số lượng:</span>
            <div className="flex items-center border rounded-2xl">
              <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-12 h-12 text-2xl hover:bg-gray-100 rounded-l-2xl">-</button>
              <input type="text" value={quantity} readOnly className="w-16 text-center text-xl" />
              <button onClick={() => setQuantity(quantity+1)} className="w-12 h-12 text-2xl hover:bg-gray-100 rounded-r-2xl">+</button>
            </div>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-xl font-semibold rounded-2xl transition">
            Thêm vào giỏ hàng
          </button>

          {}
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