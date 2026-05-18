import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);


  const allProducts = [
    { id: 1, name: "AirPods Pro 2", price: 6500000, sold: 1240, stock: 45, category: "Premium", image: "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2" },
    { id: 2, name: "Sony WH-1000XM5", price: 10500000, sold: 890, stock: 22, category: "Premium", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb" },
    { id: 3, name: "JBL Tune 760NC", price: 2850000, sold: 2340, stock: 98, category: "Mid-range", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
    { id: 4, name: "Samsung Galaxy Buds 3", price: 4200000, sold: 1560, stock: 67, category: "Mid-range", image: "https://images.unsplash.com/photo-1600374917838-1df876d745c7" },
    { id: 5, name: "Bose QuietComfort Ultra", price: 8900000, sold: 650, stock: 18, category: "Premium", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb" },
    { id: 6, name: "Apple AirPods Max", price: 13500000, sold: 420, stock: 15, category: "Premium", image: "https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, name: "Anker Soundcore Q35", price: 1850000, sold: 1890, stock: 120, category: "Mid-range", image: "https://i.guim.co.uk/img/media/e03285f3793514a73726cc0edcd13014a6c00fe2/62_255_5388_3232/master/5388.jpg?width=445&dpr=1&s=none&crop=none" },
    { id: 8, name: "Beats Studio Pro", price: 7500000, sold: 980, stock: 35, category: "Premium", image: "https://images.unsplash.com/photo-1689357639029-f9397ac24b6a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 9, name: "OneOdio Pro 10", price: 5200000, sold: 1450, stock: 55, category: "Premium", image: "https://cdni.dienthoaivui.com.vn/x,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/tai-nghe-chup-tai-co-day-oneodio-pro-10-pbl-1.jpg" },
    { id: 10, name: "Marshall Major IV", price: 3200000, sold: 780, stock: 80, category: "Mid-range", image: "https://images.unsplash.com/photo-1602833703296-0b79f0b08b0e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

 
  const observer = useRef();
  const lastProductRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);


  const filteredProducts = allProducts.filter(p => {
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || p.category === category;
    const matchMin = minPrice === '' || p.price >= Number(minPrice);
    const matchMax = maxPrice === '' || p.price <= Number(maxPrice);
    return matchSearch && matchCategory && matchMin && matchMax;
  });

  const displayedProducts = filteredProducts.slice(0, page * 8);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">AudioPro</h1>
          <a href="/" className="text-lg hover:text-indigo-600">Trang chủ</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">Tất cả sản phẩm</h1>


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
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Tất cả danh mục</option>
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


        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <div 
              key={product.id}
              ref={index === displayedProducts.length - 1 ? lastProductRef : null}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition cursor-pointer group"
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  alt={product.name} 
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl line-clamp-2">{product.name}</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-3">
                  {product.price.toLocaleString('vi-VN')}₫
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Đã bán {product.sold} • Còn {product.stock}
                </p>
                <p className="text-xs text-gray-500 mt-3">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {displayedProducts.length < filteredProducts.length && (
          <div className="text-center py-10 text-gray-500">
            Kéo xuống dưới để tải thêm sản phẩm...
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;