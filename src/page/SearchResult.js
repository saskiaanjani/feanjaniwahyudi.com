import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this line to import axios
import '../assets/css/SearchResult.css';
import Header from '../components/Header'; 
import { FaSearch } from 'react-icons/fa';
import configUrl from '../ConfigUrl'; 

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';
  const results = JSON.parse(new URLSearchParams(location.search).get('results')) || [];
  
  const [searchQuery, setSearchQuery] = useState(query); 

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${configUrl.beBaseUrl}/api/search`, { params: { query: searchQuery } });
      const results = response.data;
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}&results=${encodeURIComponent(JSON.stringify(results))}`);
      // console.log(results, 'inihasil pencaharian');
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  return (
    <div>
      {location.pathname !== '/' && <Header />}

      {/* Bagian Pencarian yang ingin ditampilkan */}
      <div className="search-container">
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="Cari di sini..." 
            className="search-input" 
            value={searchQuery} 
            onChange={handleInputChange}  
          />
          <div className="search-icon" onClick={handleSubmit}>
            <FaSearch />
          </div>
        </div>
      </div>

      <div className="search-results-page">
        <h1>Hasil Pencarian</h1>
        {query && <p>Hasil pencarian untuk: <strong>{query}</strong></p>}
        <ul>
          {results.length > 0 ? (
            results.map(result => (
              <li key={result.id} className="result-item">
                <a href={`/articles/${result.id}/${encodeURIComponent(result.slug)}`} className="result-link">
                  {result.title}
                </a>
                <div className="result-meta">
                  <span className="result-date">{result.created_at ? new Date(result.created_at).toLocaleDateString('id-ID') : 'Tanggal tidak tersedia'}</span>
                </div>
              </li>
            ))
          ) : (
            <p>Tidak ada hasil yang ditemukan.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
