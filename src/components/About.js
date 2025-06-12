import React from "react";
import "./About.css";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="about-page">
          <h1>About Us</h1>
        <div className="photodata">
          <div className="photo">
            <img src="veggies.png" alt="Fresh Produce" />
          </div>
          <div className="data">
            <h2>Our Journey:</h2>
            <p  >
              Raithanna Market began with the belief that everyone deserves access
              to fresh, organic produce. What started as a small initiative to
              connect local farmers with consumers quickly grew into a trusted
              source for quality goods. From humble beginnings, we have expanded
              our reach to serve numerous families, delivering directly to their
              doors. With every order, we bring the freshness of the farm to your
              home, ensuring the best quality for you and your family.
            </p>
          </div>
        </div>

        <div className="photodata reverse">
          <div className="photo">
            <img src="about-veg.webp" alt="Customer Support" />
          </div>
          <div className="data">
            <h2>Customer Promise:</h2>
            <p  >
              Your satisfaction is our top priority at Raithanna Market. We strive
              to exceed your expectations with every order by offering only the
              freshest products and the best possible service. Whether you need
              help with your order or have questions about our products, our
              customer support team is here for you. We take pride in delivering a
              seamless shopping experience from start to finish.
            </p>
          </div>
        </div>

        <div className="photodata">
        <div className="photo">
            <img src="donation.webp" alt="Customer Support" />
          </div>
          <div className="data">
            <h2>Food Donation Initiative:</h2>
            <p  >
              At Raithanna Market, we believe in doing our part to combat hunger.
              For every order placed, we donate a portion of food to those in
              need. Through this initiative, we aim to provide nutritious meals to
              underserved communities. Together, we can make a difference, one
              meal at a time.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
