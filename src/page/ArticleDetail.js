import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/ArticleDetail.css';
import configUrl from '../ConfigUrl';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ShareButtons from '../components/ShareButton';


const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });
  const [likeCount, setLikeCount] = useState(0);
  const [videoLink, setVideoLink] = useState(null);
  const [categories, setCategories] = useState([]);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

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
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}`);
        setArticle(response.data);
        setVideoLink(response.data.linkVideo);

        const relatedResponse = await axios.get(`${configUrl.beBaseUrl}/api/articles/related/${response.data.category_id}/${id}`);
        setRelatedArticles(relatedResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching article or related articles:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  async function handleLike(articleId) {
    const response = await fetch(`${configUrl.beBaseUrl}/api/articles/${articleId}/like`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      setLikeCount(prevCount => prevCount + 1);
    } else {
      const errorData = await response.json();
      console.error(errorData.error);
    }
  }

  useEffect(() => {
    if (article) {
      document.title = article.title;
    }
  }, [article]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}/likes`);
        setLikeCount(response.data.like_count);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    fetchLikeCount();
    return () => {
      document.title = 'Portal Informasi:Anjaniwahyudi.com';
    };
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${configUrl.beBaseUrl}/api/comments`, {
        article_id: id,
        ...newComment
      });
      setNewComment({ name: '', email: '', body: '' });
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px', padding: '10% 20%'}} alt='imgloading'></img>
    </div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `Pada: ${day}-${month}-${year} / ${hours}:${minutes}`;
  };

  const imageUrl = `${configUrl.beBaseUrl}${article.image_url}`;
  const articleUrl = window.location.href; 
  const articleTitle = article.title; 

  return (
    <div>
      <Header />
      <div className="article-detail">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link> &gt;
          <Link to={`/kategori/${getCategoryName(article.category_id)}`} className="breadcrumb-link">
            &nbsp;
            {getCategoryName(article.category_id)}
          </Link>
        </nav>

        <h1 style={{textAlign: 'left'}}>{article.title}</h1>
        <div className="footer-detail-artikel">
          <p className="article-meta">{formatDate(article.created_at)}</p>
          <p className="article-meta">Dibaca: {article.views} Kali</p>
        </div>

        <div className="image-wrapper" style={{position: 'relative'}}>
          <img src={imageUrl} alt={article.title || 'Gambar artikel'} className="article-image-full" />
          <div className='logo-thumbnail'></div>
        </div>

        <div className='article-body-container'>
          {article.body.split(/\n+/).map((paragraph, index) => (
            <p key={index} className="article-body">{paragraph}</p>
          ))}
          <ShareButtons articleUrl={articleUrl} articleTitle={articleTitle} />
        </div>

        <div className="like-container">
          <div className="like-button" onClick={() => handleLike(id)}>
            Like
            <span className="like-icon">
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
          </div>
          <div className="like-count">{likeCount}</div>
        </div>

        {videoLink && (
          <div className="video-wrapper">
            <h4>Watch the Video:</h4>
            <div className="video-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(videoLink)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          </div>
        )}

        <div className="comments">
          <div className="comments-section">
            <h3>Komentar</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={comment.id || index} className="comment">
                  <div>
                    <strong>{comment.name}</strong>
                  </div>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p>Belum ada komentar.</p>
            )}
          </div>

          <div className="comment-form">
            <h3>Tinggalkan Komentar</h3>
            <form onSubmit={handleSubmitComment} style={{ margin: '10px' }}>
              <div>
                <label>Nama</label>
                <input
                  type="text"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Komentar</label>
                <textarea
                  value={newComment.body}
                  onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Kirim Komentar</button>
            </form>
          </div>
        </div>

        <div className="related-articles">
  <h3>Artikel Terkait</h3>
  {relatedArticles.length > 0 ? (
    <div className="related-article-grid">
      {relatedArticles.map(relatedArticle => (
        <div key={relatedArticle.id} className="related-article-card">
          <img
            src={`${configUrl.beBaseUrl}${relatedArticle.image_url}`}
            alt={relatedArticle.title}
            className="related-article-image"
          />
          <div style={{paddingLeft: '9px', paddingBottom: '5px'}}>
            <Link to={`/articles/${relatedArticle.id}/${relatedArticle.slug}`} className="related-article-link">
              {relatedArticle.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
          ) : (
            <p>Tidak ada artikel terkait.</p>
          )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
