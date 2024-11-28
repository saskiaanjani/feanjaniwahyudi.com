import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p style={{color: 'white'}}>Copyright © 2024 anjaniwahyudi.com</p>
      <div className="social-icons">
        <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i> 
        </a>
      </div>
    </footer>
  );
};

export default Footer;
