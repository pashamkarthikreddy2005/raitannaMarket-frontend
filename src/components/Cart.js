import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './service/UserService';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (UserService.isAuthenticated()) {
      fetchCart();
    }
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

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/cart', getAuthConfig());
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("❌ Failed to fetch cart.", {
        style: { marginTop: '60px' } 
      });
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/user/cart/${productId}`, getAuthConfig());
      toast.success("🗑️ Item removed from cart!", {
        style: { marginTop: '60px' } 
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("❌ Failed to remove item.", {
        style: { marginTop: '60px' } 
      });
    }
  };

  const handleOrderNow = (productName) => {
    alert(`Ordered ${productName}. You can set quantity on the order page.`);
    // Future: Call actual order API
  };

  const handleBuyAll = () => {
    alert(`Ordered all items worth ₹${getTotalAmount().toFixed(2)}. Set quantities on order page.`);
    // Future: Call bulk order API
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const getTotalAmount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => {
      const discounted = getDiscountedPrice(item.product.price, item.product.discount || 0);
      return sum + discounted;
    }, 0);
  };

  const getTotalSaved = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((saved, item) => {
      const original = item.product.price;
      const discounted = getDiscountedPrice(item.product.price, item.product.discount || 0);
      return saved + (original - discounted);
    }, 0);
  };

  if (!UserService.isAuthenticated()) {
    return (
      <>
        <div className="products-container">
          <h2>Your Cart</h2>
          <p className='loginMessage'>
            Please <a href="/login">login</a> to view your cart.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="products-container">
        <h2>Your Cart</h2>
        {cart && cart.items && cart.items.length > 0 ? (
          <>
            <div className="products-grid">
              {cart.items.map(item => (
                <div key={item.id} className="product-card">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.productName}
                    className="product-image"
                  />
                  <h3>{item.product.productName}</h3>
                  <p>
                    Price:{' '}
                    {item.product.discount > 0 ? (
                      <>
                        <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                          ₹{item.product.price}
                        </span>{' '}
                        <span style={{ fontWeight: 'bold', color: 'green' }}>
                          ₹{getDiscountedPrice(item.product.price, item.product.discount).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontWeight: 'bold' }}>₹{item.product.price}</span>
                    )}
                  </p>
                  <div className="product-buttons">
                    <button
                      className="cart-button"
                      onClick={() => handleRemove(item.product.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="buy-button"
                      onClick={() => handleOrderNow(item.product.productName)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{getTotalAmount().toFixed(2)}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                You saved ₹{getTotalSaved().toFixed(2)} on this cart!
              </p>
              <button className="buy-button" onClick={handleBuyAll}>
                Buy All
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}

export default Cart;
