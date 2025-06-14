import React, { useEffect, useState } from 'react';
import './Products.css';
import { dummyProducts } from './dummyProducts';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
  const notify = (product) => {
  toast.success(`🛒 ${product.name} added to cart!`, {
    position: "top-right",
    autoClose: 2000,
    className: "my-custom-toast",
    progressClassName: "toast-progress",
  });
};


  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState({
    vegetables: false,
    spices: false,
    milk: false,
    pickles: false
  });

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(Number(value));
    if (name === 'maxPrice') setMaxPrice(Number(value));
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const filteredProducts = products.filter(product => {
    const isCategoryMatch =
      selectedCategories[product.category.toLowerCase()] ||
      Object.values(selectedCategories).every(val => !val); // If none selected, show all

    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      isCategoryMatch &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  return (
    <>
      <div className="products-container">
        <h2>All Products</h2>

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
              {["vegetables", "spices", "milk", "pickles"].map(cat => (
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
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price.toFixed(2)}</p>
                <p>Quantity: {product.stockQuantity}</p>
                <div className="product-buttons">
                  <button
                    className="cart-button"
                    onClick={() => notify(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="buy-button"
                    onClick={() => alert(`Ordered ${product.name}`)}
                  >
                    Order Now
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

export default Products;
