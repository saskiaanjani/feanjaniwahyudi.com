import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import configUrl from '../ConfigUrl'; 
import '../assets/css/VidioPage.css'; 
import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articles/category/video`); 
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  if (loading) {
    return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
       <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px'}} alt='imgloading'></img>
    </div>;
  }

  return (
    <div className="video-page">
      <h1>Halaman Video</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <h2>{video.title}</h2>
            <iframe
              src={video.url} 
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
              width="100%"
              height="315"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
