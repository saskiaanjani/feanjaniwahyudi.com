import React, { useState } from 'react'; 
import '../assets/css/Header.css';
import logoImage from '../asset/img/logo.png';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown'; 

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu); 
  };

  return (
    <>
      <div className='wraper-navbar-bottom'>
        <div className="navbar-bottom">
        <div className="nav-logo">
  <a href="https://www.anjaniwahyudi.com">
    <img
      src={logoImage}
      alt="Logo Anjani Wahyudi"
      style={{ maxWidth: '150px', height: 'auto' }}
    />
  </a>
</div>

          <div className='wraperDesktop'>
        <ul className={`menu-list ${showMenu ? 'test' : ''}`} style={{marginTop: '0'}}>
          <li><Link to="/">Beranda</Link></li> 
          <li><Link to="/berita-terkini">Terkini</Link></li>
          <li><Link to="/kategori/video">Video</Link></li> 
          <li><Link to="/terpopuler">Terpopuler</Link></li>
        </ul>
      </div>

          <div style={{ display: 'flex' }}>
            <div className="nav-right">
              <Link to="/search">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  size="2x" 
                  style={{ marginRight: '10px', color: 'white' }} 
                />
              </Link>
            </div>

            <div>
              <FontAwesomeIcon 
                icon={faBars} 
                size="2x" 
                onClick={handleMenuClick} 
                style={{ marginRight: '30px', color: 'white' }} 
              />
            </div>
          </div>
        </div>
      </div>

      {showMenu && (
        <div style={{ position: 'absolute', top: '60px', right: '0', zIndex: 1000 }}>
          <CategoryDropdown />
        </div>
      )}
    </>
  );
};

export default Header;
