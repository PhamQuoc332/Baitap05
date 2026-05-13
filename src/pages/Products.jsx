import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allProducts = [
  { 
    id: 1, name: "AirPods Pro 2", price: 6500000, stock: 45, sold: 1240, category: "Premium",
    image: "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2"
  },
  { 
    id: 2, name: "Sony WH-1000XM5", price: 10500000, stock: 22, sold: 890, category: "Premium",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"
  },
  { 
    id: 3, name: "JBL Tune 760NC", price: 2850000, stock: 98, sold: 2340, category: "Mid-range",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  { 
    id: 4, name: "Samsung Galaxy Buds 3", price: 4200000, stock: 67, sold: 1560, category: "Mid-range",
    image: "https://images.unsplash.com/photo-1600374917838-1df876d745c7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 5, name: "Bose QuietComfort Ultra", price: 8900000, stock: 18, sold: 650, category: "Premium",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"
  },
];

  useEffect(() => {
    let result = [...allProducts];

    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    setFilteredProducts(result);
  }, [search, category, minPrice, maxPrice]);

const ProductCard = ({ product }) => (
  <div 
    onClick={() => navigate(`/product/${product.id}`)}
    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition cursor-pointer group"
  >
    {}
    <div className="h-64 bg-gray-100 overflow-hidden">
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
      </div>

      <p className="text-sm text-green-600 mt-2">
        Đã bán {product.sold} • Còn {product.stock}
      </p>
      <p className="text-xs text-gray-500 mt-3">{product.category}</p>
    </div>
  </div>
);
  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">AudioPro</h1>
          <a href="/" className="text-lg hover:text-indigo-600">Trang chủ</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">Tất cả sản phẩm</h1>

        {}
        <div className="bg-white p-6 rounded-2xl shadow mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
          />

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Tất cả danh mục</option>
            <option value="Premium">Premium</option>
            <option value="Mid-range">Mid-range</option>
          </select>

          <input
            type="number"
            placeholder="Giá tối thiểu"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="number"
            placeholder="Giá tối đa"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-xl text-gray-500 col-span-full text-center py-20">
              Không tìm thấy sản phẩm nào phù hợp
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;