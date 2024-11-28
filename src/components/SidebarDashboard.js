import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faFileAlt, faList, faFolder, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/SidebarDashboard.css';
import logo from '../asset/img/logo.2.png';
import configUrl from '../ConfigUrl';

const SidebarDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar-container">
        <div className="logo-container">
          <img src={logo} alt="AnjaniNews Logo" className="logo" />
        </div>
        <ul>
          <li className="list-sidebar">
            <a href={`${configUrl.feBaseUrl}/indexdashboard`}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="list-sidebar">
            <a href={`${configUrl.feBaseUrl}/create-article`}>
              <FontAwesomeIcon icon={faPen} />
              <span>Create</span>
            </a>
          </li>
          <li className="list-sidebar">
            <a href={`${configUrl.feBaseUrl}/dashboard`}>
              <FontAwesomeIcon icon={faFileAlt} />
              <span>Post</span>
            </a>
          </li>
          <li className="list-sidebar">
            <a href={`${configUrl.feBaseUrl}/articles`}>
              <FontAwesomeIcon icon={faList} />
              <span>List</span>
            </a>
          </li>
          <li className="list-sidebar">
            <a href={`${configUrl.feBaseUrl}/categories`}>
              <FontAwesomeIcon icon={faFolder} />
              <span>Category</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="header-container">
        <div className="header-right">
          <FontAwesomeIcon 
            icon={faSignOutAlt} 
            className="logout-icon" 
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <a href={`${configUrl.feBaseUrl}/`} className="dropdown-item">Home</a>
              <a href={`${configUrl.feBaseUrl}/login`} className="dropdown-item">Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
