import React, { useState, useEffect } from 'react';
import './Home.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './service/UserService'

const slides = [
  { image: 'img2.png', text: 'Fresh Veggies Delivered Daily!' },
  { image: 'img1.png', text: 'Healthy Living Starts Here' },
  { image: 'img4.png', text: 'Organic and Farm Fresh Produce' }
];

function Home() {
  const apiBaseUrl = UserService.getBaseUrl();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [baskets, setBaskets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/public/baskets/summary`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBaskets(response.data);
    } catch (error) {
      console.error('Error fetching basket summary:', error);
      toast.error('❌ Failed to fetch baskets.');
    }
  };

  const changeSlide = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    changeSlide(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const getBasketByName = (name) => {
    return baskets.find(basket => basket.name?.toLowerCase() === name.toLowerCase());
  };

  const maxBasket = getBasketByName('Big') || {};
  const miniBasket = getBasketByName('Mini') || {};

  const renderBasketPrice = (basket) => {
    if (!basket.price) return null;
    const discountedPrice = basket.price - (basket.price * (basket.discount || 0)) / 100;
    return (
      <>
        ₹{discountedPrice.toFixed(2)}{' '}
        {basket.discount > 0 && (
          <span className="discount">₹{basket.price}</span>
        )}
      </>
    );
  };

  const handleShowMore = (path) => {
    if (UserService.isAuthenticated()) {
      navigate(path);
    } else {
      toast.info('🔒 Please login to view this basket.', {
        position: 'top-right',
        autoClose: 2000,
        className: 'my-custom-toast',
        progressClassName: 'toast-progress',
        style: { marginTop: '60px' } 
      });
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="slideshow-container">
        <img
          src={slides[currentIndex].image}
          alt="slide"
          className={`slide-image ${isFading ? 'fade-out' : 'fade-in'}`}
        />
        <div
          className={`slide-text ${isFading ? 'fade-out' : 'fade-in'} ${
            ['img2.png', 'img4.png'].includes(slides[currentIndex].image) ? 'multi-line-text' : ''
          } ${slides[currentIndex].image === 'img1.png' ? 'img1-text' : ''}`}
          style={{
            left: slides[currentIndex].image === 'img1.png' ? '50%' : '25%',
          }}
        >
          <h2>{slides[currentIndex].text}</h2>
        </div>

        <button className="prev-arrow" onClick={prevSlide}>
          <img src="left.png" alt="Previous" className="arrow-icon" />
        </button>
        <button className="next-arrow" onClick={nextSlide}>
          <img src="right.png" alt="Next" className="arrow-icon" />
        </button>
      </div>

      <div className="famous-plans-section">
        <h2 className="section-title">Our Famous Plans</h2>
        <div className="plans-container">
          <div className="plan-card">
            <div className="plan-image-wrapper">
              <img src={maxBasket.imageUrl || 'large.webp'} alt="Max Basket" className="plan-image" />
            </div>
            <h3>{maxBasket.name || 'Max Basket'}</h3>
            <p className="price">
              {renderBasketPrice(maxBasket)}
            </p>
            <button
              className="show-more-button"
              onClick={() => handleShowMore('/products/max-basket')}
            >
              Show More
            </button>
          </div>

          <div className="plan-card">
            <div className="plan-image-wrapper">
              <img src={miniBasket.imageUrl || 'small.jpg'} alt="Mini Basket" className="plan-image" />
            </div>
            <h3>{miniBasket.name || 'Mini Basket'}</h3>
            <p className="price">
              {renderBasketPrice(miniBasket)}
            </p>
            <button
              className="show-more-button"
              onClick={() => handleShowMore('/products/mini-basket')}
            >
              Show More
            </button>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Categories</h2>
        <div className="categories-container">
          <div className="category-card available">
            <img src="vegetables.webp" alt="Vegetables" className="category-image" />
            <h3>Vegetables</h3>
            <button
              className="buy-now-button"
              onClick={() => navigate('/products', { state: { selectedCategory: 'vegetables' } })}
            >
              Buy Now
            </button>
          </div>

          {[
            { img: 'fruits.webp', title: 'Fruits' },
            { img: 'milk-products.webp', title: 'Milk Products' },
            { img: 'pickles.webp', title: 'Pickles' },
            { img: 'dry-fruits.webp', title: 'Dry Fruits' },
            { img: 'rice.webp', title: 'Rice' }
          ].map((item, idx) => (
            <div className="category-card coming-soon" key={idx}>
              <img src={item.img} alt={item.title} className="category-image" />
              <h3>{item.title}</h3>
              <span className="badge">Coming Soon</span>
              <button className="buy-now-button" disabled>Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="donate-now-button" onClick={() => navigate('/donate')}>
          ❤️ Donate to Feed Children
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Home;
