import '../assets/css/Slider.css'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import configUrl from '../ConfigUrl';
import { Link } from 'react-router-dom';

const ArticleSlider = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const sliderResponse = await axios.get(`${configUrl.beBaseUrl}/api/articleSlider`);
        setArticles(sliderResponse.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {articles.map(article => (
          <div key={article.id} className="item-slider">
            <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`}>
              <img 
                src={`${configUrl.beBaseUrl}${article.image_url}`} 
                alt={article.title} 
                className="slider-image" 
              />
              <div className="slider-title">{article.title}</div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ArticleSlider;
