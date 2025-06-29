import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddBasket.css';  // Reuse same styling
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBasket() {
  const apiBaseUrl = UserService.getBaseUrl();

  const [basketSize, setBasketSize] = useState('Mini');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchBasketDetails(id);
  }, [id]);

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
      const response = await axios.get(`${apiBaseUrl}/public/product`, getAuthConfig());
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('❌ Failed to fetch products');
    }
  };

  const fetchBasketDetails = async (id) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/public/basket/${id}`, getAuthConfig());
      const basket = response.data;
      setBasketSize(basket.basketSize);
      setPrice(basket.price);
      setDescription(basket.description);
      setImageUrl(basket.imageUrl);
      setDiscount(basket.discount);
      setSelectedProducts(basket.products || []);
    } catch (error) {
      console.error('Error fetching basket:', error);
      toast.error('❌ Failed to fetch basket details');
    }
  };

  const handleProductSelect = (product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleProductRemove = (pid) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== pid));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      basketSize,
      price,
      description,
      discount,
      imageUrl,
      products: selectedProducts.map(p => ({ id: p.id }))
    };

    try {
      await axios.put(`${apiBaseUrl}/admin/basket/${id}`, payload, getAuthConfig());
      toast.success('✅ Basket updated successfully');
      setTimeout(() => navigate('/admin/baskets'), 2000);
    } catch (error) {
      console.error('Error updating basket:', error);
      toast.error('❌ Failed to update basket');
    }
  };

  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="add-basket-container">
      <h2>Update Basket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Basket Size</label>
          <select value={basketSize} onChange={(e) => setBasketSize(e.target.value)}>
            <option value="Mini">Mini</option>
            <option value="Big">Big</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Select Products</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="product-list">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-item">
                <span>{p.productName}</span>
                <button type="button" onClick={() => handleProductSelect(p)}>Add</button>
              </div>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <div className="selected-products">
              <h4>Selected Products:</h4>
              {selectedProducts.map(p => (
                <div key={p.id} className="selected-product-item">
                  <span>{p.productName}</span>
                  <button type="button" onClick={() => handleProductRemove(p.id)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">Update Basket</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateBasket;
