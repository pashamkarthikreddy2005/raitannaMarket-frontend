import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import UserService from './service/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (UserService.isAuthenticated()) {
      fetchProfile();
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

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/my-details', getAuthConfig());
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("❌ Failed to load profile.");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user/add-address', address, getAuthConfig());
      toast.success("✅ Address added successfully!");
      setShowAddressForm(false);
      setAddress({ street: '', city: '', state: '', zipCode: '' });
      fetchProfile();
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("❌ Failed to add address.");
    }
  };

  if (!UserService.isAuthenticated()) {
    return (
      <div className="profile-container">
        <h2>Profile</h2>
        <p className="login-message">Please <a href="/login">login</a> to view your profile.</p>
      </div>
    );
  }

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        {user.image && (
          <img
            src={`data:image/jpeg;base64,${user.image}`}
            alt="Profile"
            className="profile-image"
          />
        )}
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>

          <p><strong>Address(es):</strong></p>
          {user.addresses && user.addresses.length > 0 ? (
            <ul>
              {user.addresses.map(addr => (
                <li key={addr.id}>
                  {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses added</p>
          )}

          <button className="add-address-button" onClick={() => setShowAddressForm(!showAddressForm)}>
            {showAddressForm ? "Cancel" : "Add Another Address"}
          </button>

          {showAddressForm && (
            <form className="address-form" onSubmit={handleAddressSubmit}>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleAddressChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={handleAddressChange}
                required
              />
              <button type="submit">Save Address</button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
