import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/BeritaTerkini.css';
import { Link, useLocation } from 'react-router-dom';
import configUrl from '../ConfigUrl';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BeritaTerkini = () => {
  const location = useLocation(); 
  const [beritaTerkini, setBeritaTerkini] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedTwoDaysAgo = twoDaysAgo.toISOString().split('T')[0];

    axios.get(`${configUrl.beBaseUrl}/api/articles?from=${formattedTwoDaysAgo}&to=${formattedToday}`) 
      .then(response => {
        setBeritaTerkini(response.data.slice(0, 4));  
        setError(null);
      })
      .catch(error => {
        console.error('Gagal mengambil berita terkini:', error);
        setError('Gagal mengambil berita terkini.');
      });
  }, []);

  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  const styles = {
    tess: {
      padding: '110px 20px 20px 20px', 
    },
   };

  return (
    <div className={`berita-terkini`}>
      {location.pathname !== '/' && <Header />}
    <div style={styles.tess}>
      <div>
        <div className="header-ar-latest">Terkini</div>
        {error && <p className="error">{error}</p>}
        {beritaTerkini.map(article => (
          <div key={article.id} className="latest-news-card">
            <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`} className="link latest-news-title">
                {article.title}
              </Link>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <div className="latest-news-text">
                {article.body.length > 62 ? `${article.body.slice(0, 62)}...` : article.body}
              </div>
              <div className="latest-news-meta">
              Published: {formatTanggal(article.created_at)}
              </div>
            </div>
            <img 
              src={`${configUrl.beBaseUrl}${article.image_url}`}  
              alt={article.title} 
              className="latest-news-image"
            />
            </div>
          </div>
        ))}
      </div>
      </div>
      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

export default BeritaTerkini;
