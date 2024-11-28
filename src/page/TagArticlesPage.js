import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import configUrl from '../ConfigUrl';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TagArticlesPage = () => {
    const { tagId } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${configUrl.beBaseUrl}/api/articlestoptags`);
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles by tag:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [tagId]);

    return (
        <div>
            {location.pathname !== '/' && <Header />}

            <div style={{ padding: '20px 10%' }}>
                {loading ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img 
                            src="https://www.anjaniwahyudi.com/imgloading.svg" 
                            style={{ width: '200px', height: '140px' }} 
                            alt='imgloading' 
                        />
                    </div>
                ) : (
                    <div style={{ paddingLeft: '10%' }}>
                        <h1 style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                            <span 
                                style={{
                                    content: '',
                                    width: '6px',
                                    height: '24px',
                                    backgroundColor: 'rgb(204, 41, 41)',
                                    marginRight: '10px',
                                    display: 'inline-block'
                                }}
                            ></span>
                            Artikel dengan Tag: #{tagId}
                        </h1>
                        {articles.length === 0 ? (
                            <p>No articles found for this tag.</p>
                        ) : (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {articles.map(article => (
                                    <li key={article.id} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        <img 
                                            src={`${configUrl.beBaseUrl}${article.image_url}`} 
                                            alt={article.title} 
                                            style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <Link 
                                                to={`/articles/${article.id}/${article.slug}`} 
                                                style={{ color: 'black', textDecoration: 'none' }}
                                            >
                                                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{article.title}</div>
                                            </Link>
                                            <div style={{ fontSize: '15px', color: '#666' }}>
                                                {article.body.length > 100 ? `${article.body.slice(0, 100)}...` : article.body}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
            {location.pathname !== '/' && <Footer />}
        </div>
    );
};

export default TagArticlesPage;
