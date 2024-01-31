import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* <div className="footer-section about">
          <h2>About InnoVenture</h2>
          <p>
            InnoVenture is a platform connecting investors with emerging
            startups.
          </p>
        </div> */}

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Mobile: +91 9876543210</p>
          <p>Email: info@innoventure.com</p>
          <p>Location: Dhankawdi, Pune</p>
        </div>
        <div className="footer-section subscribe">
          <h2>Subscribe to Us</h2>
          <p>Stay updated with our latest news and offerings.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"> Facebook </i>
            </a>
            <br />
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"> Twitter</i>
            </a>
            <br />
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"> LinkedIn</i>
            </a>
            <br />
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"> Instagram</i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 InnoVenture. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;