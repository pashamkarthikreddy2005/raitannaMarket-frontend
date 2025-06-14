import React, { useState, useEffect } from 'react';
import './Home.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const slides = [
  { image: 'img2.png', text: 'Fresh Veggies Delivered Daily!' },
  { image: 'img1.png', text: 'Healthy Living Starts Here' },
  { image: 'img4.png', text: 'Organic and Farm Fresh Produce' }
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
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
              <img src="large.webp" alt="Max Basket" className="plan-image" />
            </div>
            <h3>Max Basket</h3>
            <p className="price">
              ₹799 <span className="discount">₹999</span>
            </p>
            <button
              className="show-more-button"
              onClick={() => navigate('/products/max-basket')}
            >
              Show More
            </button>
          </div>

          <div className="plan-card">
            <div className="plan-image-wrapper">
              <img src="small.jpg" alt="Mini Basket" className="plan-image" />
            </div>
            <h3>Mini Basket</h3>
            <p className="price">
              ₹399 <span className="discount">₹499</span>
            </p>
            <button
              className="show-more-button"
              onClick={() => navigate('/products/mini-basket')}
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
            <button className="buy-now-button">Buy Now</button>
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
