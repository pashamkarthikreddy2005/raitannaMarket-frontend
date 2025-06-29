import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './service/UserService'


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState({
    vegetables: true,
    spices: true,
    milkproducts: true,
    pickles: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const fetchProducts = async () => {
    try {
      const apiBaseUrl = UserService.getBaseUrl();
      const response = await axios.get(`${apiBaseUrl}/public/product`, getAuthConfig());
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('❌ Failed to fetch products.');
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(Number(value));
    if (name === 'maxPrice') setMaxPrice(Number(value));
  };
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories(prev => ({ ...prev, [name]: checked }));
  };

  const handleAddClick = () => {
    navigate('/product/form', { state: null });
  };

  const handleUpdateClick = (product) => {
    navigate('/product/form', { state: { initialValues: product } });
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const filteredProducts = products.filter(product => {
    const categoryKey = product.category ? product.category.toLowerCase() : '';
    const isCategoryMatch =
      selectedCategories[categoryKey] ||
      Object.values(selectedCategories).every(val => !val);
  
    const discountedPrice = getDiscountedPrice(product.price, product.discount);
  
    return (
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      isCategoryMatch &&
      discountedPrice >= minPrice &&
      discountedPrice <= maxPrice
    );
  });

  return (
    <>
      <div className="products-container">
        <h2>Admin - Manage Products</h2>

        <button className="add-product-button" onClick={handleAddClick}>
          ➕ Add New Product
        </button>

        <div className="filter-section">
          <div className="searchnoption">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="category-checkboxes">
              {["vegetables", "spices", "milkproducts", "pickles"].map(cat => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    name={cat}
                    checked={selectedCategories[cat]}
                    onChange={handleCategoryChange}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="price-filter">
            <label>Price Range: ₹{minPrice} - ₹{maxPrice}</label>
            <input
              type="range"
              name="minPrice"
              min="0"
              max="1000"
              step="10"
              value={minPrice}
              onChange={handlePriceChange}
              className="price-slider"
            />
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={handlePriceChange}
              className="price-slider"
            />
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="product-image"
                />
                <h3>{product.productName}</h3>
                <p>
                  Price:{' '}
                  {product.discount > 0 ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                        ₹{product.price}
                      </span>{' '}
                      <span style={{ fontWeight: 'bold', color: 'green' }}>
                        ₹{getDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>₹{product.price}</span>
                  )}
                </p>
                <div className="product-buttons">
                  <button
                    className="cart-button"
                    onClick={() => handleUpdateClick(product)}
                  >
                    ✏️ Update Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}

export default AdminProducts;
