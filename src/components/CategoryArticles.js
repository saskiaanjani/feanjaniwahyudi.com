import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import configUrl from '../ConfigUrl';
import '../assets/css/CategoryArticles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryArticles = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/categories/${slug}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  if (loading) {
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px'}} alt='imgloading'></img>
      </div>;
  }

  return (
    <div>
      <Header />
      <div className="category-articles-list">
        <h1 className="category-articles-header">Artikel-artikel dalam Kategori "{slug}"</h1>
        <div className="category-articles">
          {articles.map((article, index) => (
            <div key={article.id} className="category-article-card">
              <div className="category-article-number">{index + 1}.</div>
              <div className="category-article-content">
                <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`} className="category-article-title">
                  {article.title}
                </Link>
                <p className="category-article-meta">
                  Published: {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <img 
                src={`${configUrl.beBaseUrl}${article.image_url}`} 
                alt={article.title} 
                className="category-article-image" 
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryArticles;
