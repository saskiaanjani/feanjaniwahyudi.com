import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configUrl from '../ConfigUrl';
import { Link } from 'react-router-dom';
import '../assets/css/ArticleList.css';
import SidebarDashboard from '../components/SidebarDashboard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    axios.get(`${configUrl.beBaseUrl}/api/articles`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });

    axios.get(`${configUrl.beBaseUrl}/api/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak ada Category';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{width: '20%'}}>
          <SidebarDashboard />
        </div>

        <div className="article-table-container">
          <table className="article-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>No</th>
                <th style={{ textAlign: 'center' }}>Foto</th>
                <th style={{ textAlign: 'center' }}>Judul Berita</th>
                <th style={{ textAlign: 'center' }}>Kategori</th>
                <th style={{ textAlign: 'center' }}>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article, index) => (
                <tr key={article.id}>
                  <td style={{ textAlign: 'center' }}>{indexOfFirstArticle + index + 1}</td>
                  <td>
                    <img 
                      src={`${configUrl.beBaseUrl}${article.image_url}`} 
                      alt={article.title} 
                      className="article-image-table"
                    />
                  </td>
                  <td>
                    <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`}>
                      {article.title}
                    </Link>
                  </td>
                  <td>{getCategoryName(article.category_id)}</td>
                  <td>{formatDate(article.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            articlesPerPage={articlesPerPage} 
            totalArticles={articles.length} 
            paginate={paginate} 
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map(number => (
          <span key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </span>
        ))}
      </div>
    </nav>
  );
};

export default ArticleList;
