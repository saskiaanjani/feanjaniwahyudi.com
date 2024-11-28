import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import configUrl from '../ConfigUrl';
import '../assets/css/TopTagsArticle.css';
import Header from './Header';
import Footer from '../components/Footer';

const TopTags = () => {
  const [articles, setArticles] = useState([]);
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTopTagArticles = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articlestoptags`);
        setArticles(response.data); 
      } catch (error) {
        console.error('Error fetching top tag articles:', error);
      }
    };

    fetchTopTagArticles();
  }, []);

  return (
    <div>
      {location.pathname !== '/' && <Header />}

      <div className="top-tag-articles">
      <div className="top-tag-header">
  <span>Terfavorit</span>
</div>
        <p className="top-info">Simak berita trending di anjaniwahyudi.com, tonton untuk tahu update terbaru!</p>
        <div className="top-tag-articles-list">
          {articles.slice(0, 4).map((article, index) => (
            <div key={article.id} className="card-tag">
              <div className="article-number">
                {index + 1}
              </div>
              <div className="article-content">
                <Link to={`/articles/${article.id}/${article.slug}`} className="article-title">
                  {article.title}
                </Link>
                <p className="article-meta">
                  {getCategoryName(article.category_id)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

export default TopTags;
