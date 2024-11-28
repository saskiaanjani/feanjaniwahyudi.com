import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/PopularArticle.css';
import { Link, useLocation } from 'react-router-dom';
import configUrl from '../ConfigUrl';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PopularArticle = () => {
  const location = useLocation();
  const [popularArticles, setPopularArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${configUrl.beBaseUrl}/api/articlespop`)
      .then(response => {
        setPopularArticles(response.data.slice(0, 6)); 
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching popular articles:', error);
        setError('Gagal mengambil artikel populer.');
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      {location.pathname !== '/' && <Header />}

      <div className="popular-article-container">
        <div className="header-ar-popular">Terpopuler</div>
        {error && <p className="error">{error}</p>}
        <div className="popular-article-grid">
          {popularArticles.map(article => (
            <div key={article.id} className="popular-article-card">
              <img 
                src={`${configUrl.beBaseUrl}${article.image_url}`} 
                alt={article.title} 
                className="popular-article-image"
              />
              <div className="popular-article-text">
                <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`} className="link popular-article-title">
                  {article.title}
                </Link>
                <div className="popular-article-meta">
                  Published:{formatDate(article.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

export default PopularArticle;
