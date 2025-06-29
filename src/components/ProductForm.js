import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductForm.css';
import { toast } from 'react-toastify';

const CATEGORY_OPTIONS = ['Vegetables', 'Spices', 'MilkProducts', 'Pickles'];

const ProductForm = () => {
  const apiBaseUrl = UserService.getBaseUrl();
  
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues = location.state?.initialValues;

  const [product, setProduct] = useState({
    id: null,
    productName: '',
    price: '',
    description: '',
    discount: '',
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (initialValues) {
      setProduct({
        id: initialValues.id || null,
        productName: initialValues.productName || '',
        price: initialValues.price || '',
        description: initialValues.description || '',
        discount: initialValues.discount || '',
        category: initialValues.category || '',
        imageUrl: initialValues.imageUrl || ''
      });
    }
  }, [initialValues]);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateProduct = () => {
    const requiredFields = ['productName', 'price', 'description', 'discount', 'category', 'imageUrl'];
    for (let field of requiredFields) {
      if (!product[field]) {
        toast.error(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

 const addProduct = async () => {
  const { id, ...rest } = product;
  const newProduct = {
    ...rest,
    price: parseInt(rest.price),
    discount: parseInt(rest.discount)
  };
  try {
    const res = await axios.post(`${apiBaseUrl}/admin/product`, newProduct, getAuthConfig());
    toast.success(`✅ ${res.data.productName} added successfully!`);
    navigate('/admin/products');
  } catch (error) {
    console.error('Add failed:', error);
    const msg = error.response?.data?.message || 'Add failed.';
    toast.error(`❌ ${msg}`);
  }
};

  const updateProduct = async () => {
    const updatedProduct = {
      ...product,
      price: parseInt(product.price),
      discount: parseInt(product.discount)
    };
    try {
      const res = await axios.put(`${apiBaseUrl}/admin/product`, updatedProduct, getAuthConfig());
      toast.success(`✅ ${res.data.productName} updated successfully!`);
      navigate('/admin/products');
    } catch (error) {
      console.error('Update failed:', error);
      const msg = error.response?.data?.message || 'Update failed.';
      toast.error(`❌ ${msg}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateProduct()) return;

    if (product.id) updateProduct();
    else addProduct();
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{product.id ? 'Update Product' : 'Add New Product'}</h3>

      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={product.productName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        value={product.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="discount"
        placeholder="Discount (%)"
        value={product.discount}
        onChange={handleChange}
        min="0"
        max="100"
        required
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {CATEGORY_OPTIONS.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        required
      />

      <div className="form-buttons">
        <button type="submit" className="submit-button">
          {product.id ? 'Update' : 'Add'}
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
