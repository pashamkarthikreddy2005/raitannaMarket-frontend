import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BasketProductDetails.css';
import Footer from './Footer';

const dummyBasketData = {
  'max-basket': {
    title: 'Max Basket',
    image: 'large.webp',
    price: 799,
    originalPrice: 999,
    items: [
      { name: 'Tomatoes', weight: '1kg', image: 'tomato.jpg' },
      { name: 'Potatoes', weight: '2kg', image: 'potato.jpg' },
      { name: 'Onions', weight: '1.5kg', image: 'onion.jpg' },
      { name: 'Carrots', weight: '1kg', image: 'carrot.jpg' },
      { name: 'Cucumbers', weight: '500g', image: 'cucumber.jpg' },
    ],
  },
  'mini-basket': {
    title: 'Mini Basket',
    image: 'small.jpg',
    price: 399,
    originalPrice: 499,
    items: [
      { name: 'Tomatoes', weight: '500g', image: 'tomato.jpg' },
      { name: 'Onions', weight: '1kg', image: 'onion.jpg' },
      { name: 'Potatoes', weight: '1kg', image: 'potato.jpg' },
    ],
  }
};

function BasketProductDetails() {
  const { basketType } = useParams();
  const [basket, setBasket] = useState(null);

  useEffect(() => {
    // Simulating fetch from backend for now
    setBasket(dummyBasketData[basketType]);
  }, [basketType]);

  if (!basket) return <div>Loading...</div>;

  return (
    <>
      <div className="basket-product-container">
        <h1 className='basket-head'>{basket.title}</h1>
        <img src={basket.image} alt={basket.title} className="basket-image" />
        <p className="price">
          ₹{basket.price} <span className="original-price">₹{basket.originalPrice}</span>
        </p>

        <h2 className='whats-inside'>What's Inside?</h2>
        <div className="basket-items">
          {basket.items.map((item, index) => (
            <div className="basket-item-card" key={index}>
              <img src={item.image} alt={item.name} className="basket-item-image" />
              <h3>{item.name}</h3>
              <p>{item.weight}</p>
            </div>
          ))}
        </div>

        <button className="buy-now-button">Buy Now</button>
      </div>

      <Footer />
    </>
  );
}

export default BasketProductDetails;
