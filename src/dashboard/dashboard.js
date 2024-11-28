import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import configUrl from '../ConfigUrl';
import '../assets/css/Dashboard.css';
import SidebarDashboard from '../components/SidebarDashboard';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('authTokenSitusNews');

      if (!token) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get(`${configUrl.beBaseUrl}/api/articles`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setArticles(response.data);
        } catch (error) {
          console.error('Error fetching articles:', error.response?.data || error.message);
        }
      }
    };

    fetchArticles();
  }, [navigate]);

  const handleEdit = (articleId) => {
    navigate(`/edit-article/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    const token = localStorage.getItem('authTokenSitusNews');
    if (window.confirm('Yakin akan menghapus artikel ini?')) {
      try {
        await axios.delete(`${configUrl.beBaseUrl}/api/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Article with id ${articleId} deleted`);
        setArticles(articles.filter(article => article.id !== articleId));
      } catch (error) {
        console.error('Error deleting article:', error.response?.data || error.message);
      }
    }
  };

  const handleHeadline = async (articleId) => {
    const token = localStorage.getItem('authTokenSitusNews');
    try {
        await axios.post(`${configUrl.beBaseUrl}/api/articles/${articleId}/headline`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`Article ${articleId} set as headline`);
        
        navigate('/slider');
        
    } catch (error) {
        console.error('Error setting headline:', error.response?.data || error.message);
    }
};


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{width: '20%'}}>
          <SidebarDashboard />
        </div>
        <div className="dashboard">
          <h1>Dashboard Artikel Saya</h1>
          <table className="article-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`} style={{ textTransform: 'capitalize' }}>
                      {article.title || 'Judul tidak tersedia'}
                    </Link>
                    {article.isHeadline && <span style={{ color: 'green', marginLeft: '10px' }}> (Headline)</span>}
                  </td>
                  <td>{article.created_at ? formatDate(article.created_at) : 'Tanggal tidak tersedia'}</td>
                  <td>
                    <button className="action-button edit" onClick={() => handleEdit(article.id)}>Ubah</button>
                    <button className="action-button delete" onClick={() => handleDelete(article.id)}>Hapus</button>
                    <button className="action-button headline" onClick={() => handleHeadline(article.id)}>Jadikan Headline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
