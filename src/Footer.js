import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* Contact information */}
            <h4>Contact Us</h4>
            <p>123 SR Nagar, Hyderabad, India</p>
            <p>Email: likhithalv333@gmail.com</p>
            <p>Phone: +91 9390858824</p>
          </div>
          <div className="col-md-6">
            {/* Links */}
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>
        </div>
        {/* Social media icons */}
        <div className="social-icons">
  <a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
  <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>
  <a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
</div>

      </div>
      {/* Copyright */}
      <div className="bottom-bar">
        <div className="container">
          <p>&copy; 2024 My E-commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
