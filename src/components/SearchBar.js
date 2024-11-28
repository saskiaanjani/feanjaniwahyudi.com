import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import '../assets/css/Search.css';
import { FaSearch } from 'react-icons/fa';
import configUrl from '../ConfigUrl';  
import Header from './Header'; 

const SearchBar = () => {
  const [query, setQuery] = useState(''); 
  const [popularSearches, setPopularSearches] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articlespop`); 
        setPopularSearches(response.data.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching popular searches:', error);
      }
    };

    fetchPopularSearches(); 
  }, []); 

  const handleInputChange = (event) => {
    setQuery(event.target.value); 
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${configUrl.beBaseUrl}/api/search`, { params: { query } }); 
      const results = response.data;
      navigate(`/search-results?query=${encodeURIComponent(query)}&results=${encodeURIComponent(JSON.stringify(results))}`); 
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  return (
    <>
      <Header /> 
      <div className="search-container">
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="Cari di sini..." 
            className="search-input" 
            value={query} 
            onChange={handleInputChange}  
          />
          <div className="search-icon" onClick={handleSubmit}>
            <FaSearch />
          </div>
        </div>
        <div className="popular-searches">
          <h3>Pencarian populer</h3>
          <div className="search-buttons">
            {popularSearches.length > 0 ? ( 
              popularSearches.map((article, index) => (
                <div className="search-button" key={index}>{article.title}</div>
              ))
            ) : (
              <p>Tidak ada pencarian populer saat ini.</p> 
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
