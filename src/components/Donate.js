import React, { useState } from 'react';
import './Donate.css';
import Footer from './Footer';

function Donate() {
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = () => {
    if (!amount || !email) {
      alert('Please select an amount and enter your email.');
      return;
    }

    // Here you can add backend API call to process donation
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="donate-container">
        <h2>🎉 Thank You for Your Kindness!</h2>
        <p>We’ve sent a thank you message to <strong>{email}</strong>.</p>
        <video controls width="400" style={{ marginTop: '20px' }}>
          <source src="/thankyou-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="donate-container">
        <h1 className='donate-head'>Donate to Feed Children</h1>
        <p>Choose a donation plan and make someone's day special!</p>

        <div className="donation-options">
          <div
            className={`donation-card ${amount === 700 ? 'selected' : ''}`}
            onClick={() => setAmount(700)}
          >
            <h3>Feed 20 Children</h3>
            <p>₹700</p>
          </div>

          <div
            className={`donation-card ${amount === 1200 ? 'selected' : ''}`}
            onClick={() => setAmount(1200)}
          >
            <h3>Feed 40 Children</h3>
            <p>₹1200</p>
          </div>
        </div>

        <div className="donation-form">
          <input
  type="text"
  placeholder="Donate in the name of"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Occasion (e.g., Birthday, Anniversary)"
  value={occasion}
  onChange={(e) => setOccasion(e.target.value)}
  required
/>
          <button className="donate-button" onClick={handleDonate}>Donate Now</button>

          <p className="donate-note">
  📩 A thank-you video link will be sent to your <strong>registered email</strong> and <strong>phone number</strong>.
</p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Donate;
