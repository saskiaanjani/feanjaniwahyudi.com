import React, { useState, useEffect, useCallback } from 'react';
import { FaSignInAlt, FaUtensils, FaCar, FaPlane, FaFutbol, FaFilm, FaComments, FaTimes, FaVideo, FaTachometerAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/CategoryDropdown.css';

const CategoryDropdown = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authTokenSitusNews');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('authTokenSitusNews');
    localStorage.removeItem('userSitusNews');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/indexdashboard');
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy');
  };

  const handlePedomanSiberClick = () => {
    navigate('/Pedoman-Siber');
  };

  const handleAboutUsClick = () => {
    navigate('/About');
  };

  const handleOutsideClick = useCallback((event) => {
    const sidebar = document.querySelector('.sidebar');
    if (isOpen && sidebar && !sidebar.contains(event.target)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    isOpen && (
      <div className="menu-wraper">
        <ul className="menu">
          <li className="menu-title">
            <span>Menu</span>
            <FaTimes onClick={handleCloseClick} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
          </li>

          {!isLoggedIn && (
            <li onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
              <FaSignInAlt /> Login
            </li>
          )}

          {isLoggedIn && (
            <li onClick={handleDashboardClick} style={{ cursor: 'pointer' }}>
              <FaTachometerAlt /> Dashboard
            </li>
          )}

          <li><Link to="/kategori/entertaiment"><FaFilm /> Entertainment</Link></li>
          <li><Link to="/kategori/politik"><FaComments /> Politik</Link></li>
          <li><Link to="/kategori/food"><FaUtensils /> Food</Link></li>
          <li><Link to="/kategori/otomotif"><FaCar /> Otomotif</Link></li>
          <li><Link to="/kategori/travel"><FaPlane /> Travel</Link></li>
          <li><Link to="/kategori/sport"><FaFutbol /> Sport</Link></li>
          <li><Link to="/kategori/video"><FaVideo /> Video</Link></li>

          <div className="two-column-menu">
            <li onClick={handlePedomanSiberClick} style={{ cursor: 'pointer' }}>
              Pedoman Siber
            </li>
            <li onClick={handlePrivacyPolicyClick} style={{ cursor: 'pointer' }}>
              Privacy Policy
            </li>
            <li onClick={handleAboutUsClick} style={{ cursor: 'pointer' }}>
              About Us
            </li>
            <li>
              <Link to="/contact" style={{ cursor: 'pointer' }}>Contact</Link>
            </li>
            <li>
              <Link to="https://webmail.anjaniwahyudi.com/" target='_blank' style={{ cursor: 'pointer' }}>Email</Link>
            </li>
          </div>

          {isLoggedIn && (
            <li onClick={handleLogoutClick} className="logout" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default CategoryDropdown;