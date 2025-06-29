import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBaskets.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './service/UserService'


function AdminBaskets() {
  const [baskets, setBaskets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBaskets();
  }, []);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };

  const fetchBaskets = async () => {
    try {
      const apiBaseUrl = UserService.getBaseUrl();
      const response = await axios.get(`${apiBaseUrl}/public/baskets/summary`, getAuthConfig());
      console.log(response.data);
      setBaskets(response.data);
    } catch (error) {
      console.error('Error fetching baskets:', error);
      toast.error('❌ Failed to fetch baskets');
    }
  };

  const handleAddClick = () => {
    navigate('/admin/basket/add/form');
  };

  const handleUpdateClick = (id) => {
    navigate(`/admin/basket/update/${id}`);
  };

  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this basket?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '8px' }}>
          <button onClick={() => confirmDelete(id)} className="toast-confirm-btn">Yes</button>
          <button onClick={() => toast.dismiss()} className="toast-cancel-btn">No</button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const apiBaseUrl = UserService.getBaseUrl();
      await axios.delete(`${apiBaseUrl}/admin/basket/${id}`, getAuthConfig());
      toast.dismiss();
      toast.success('✅ Basket deleted successfully');
      fetchBaskets();
    } catch (error) {
      console.error('Error deleting basket:', error);
      toast.error('❌ Failed to delete basket');
    }
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="admin-baskets-container">
      <h2>Admin - Manage Baskets</h2>

      <button className="add-basket-button" onClick={handleAddClick}>
        ➕ Add New Basket
      </button>

      <div className="products-grid">
        {baskets.length > 0 ? (
          baskets.map((basket) => (
            <div key={basket.id} className="product-card">
              <img
                src={basket.imageUrl}
                alt={basket.name}
                className="product-image"
              />
              <h3>{basket.name} Basket</h3>
              <p>
                Price:{' '}
                {basket.discount > 0 ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                      ₹{basket.price}
                    </span>{' '}
                    <span style={{ fontWeight: 'bold', color: 'green' }}>
                      ₹{getDiscountedPrice(basket.price, basket.discount).toFixed(2)}
                    </span>
                    {' '}({basket.discount}% off)
                  </>
                ) : (
                  <span style={{ fontWeight: 'bold' }}>₹{basket.price}</span>
                )}
              </p>
              <div className="product-buttons">
                <button
                  className="cart-button"
                  onClick={() => handleUpdateClick(basket.id)}
                >
                  ✏️ Update Basket
                </button>
                <button
                  className="cart-button"
                  style={{ backgroundColor: '#d32f2f' }}
                  onClick={() => handleDelete(basket.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No baskets available.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminBaskets;
