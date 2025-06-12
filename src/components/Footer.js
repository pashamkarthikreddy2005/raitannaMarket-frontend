import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
            <img src="foot.png" alt="Logo" className="footer-logo" />
            <p className="footer-quote">“Good things take time, but we’ll make sure they arrive on time.”</p>
            <div className="footer-divider" />
        </div>
        <div className="footer-right">
          <div className="footer-section">
            <h3>Available Locations</h3>
            <p>Hyderabad, Mumbai, Delhi, Bangalore</p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
            <a href="tel:+919876543210" className="footer-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faPhone} className="icon icon-phone" /> +91 98765 43210
            </a>
            </p>
            <p>
            <a href="mailto:support@veggieshop.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="icon icon-mail" /> support@veggieshop.com
            </a>
            </p>
            <p>
            <a href="https://www.instagram.com/veggieshop" className="footer-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icon icon-instagram" /> @veggieshop
            </a>
            </p>
            <p>
            <a href="https://www.twitter.com/veggieshop" className="footer-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="icon icon-twitter" /> @veggieshop
            </a>
            </p>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
              © 2025 Raithanna Market. All Rights Reserved.
          </div>
    </footer>
  );
}

export default Footer;
