import React, { useEffect, useState } from 'react';
import configUrl from '../ConfigUrl';
import '../assets/css/GoogleTrend.css';

const GoogleTrend = () => {
    const [rssItems, setRssItems] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const url = `${configUrl.beBaseUrl}/api/trends`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Tidak dapat mengambil data RSS');
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");

                const items = xmlDoc.querySelectorAll("item");
                const rssData = Array.from(items).flatMap(item => {
                    const newsItems = item.querySelectorAll("ht\\:news_item, news_item");
                    return Array.from(newsItems).map(news => ({
                        title: news.querySelector("ht\\:news_item_title, news_item_title")?.textContent.trim() || 'No Title',
                        url: news.querySelector("ht\\:news_item_url, news_item_url")?.textContent.trim() || '#',
                        picture: news.querySelector("ht\\:news_item_picture, news_item_picture")?.textContent.trim() || '',
                        source: news.querySelector("ht\\:news_item_source, news_item_source")?.textContent.trim() || 'Unknown Source',
                        snippet: news.querySelector("ht\\:news_item_snippet, news_item_snippet")?.textContent.trim() || '',
                        pubDate: item.querySelector("pubDate")?.textContent.trim() || '',
                    }));
                });
                
                const limitedRssData = rssData.slice(0, 16);
                // console.log(limitedRssData); 
                setRssItems(limitedRssData);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        if (rssItems.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % Math.ceil(rssItems.length / itemsPerPage));
            }, 3000); 

            return () => clearInterval(interval); 
        }
    }, [rssItems]);

    const displayedItems = rssItems.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage);

    return (
        <div className='wrapper-rss-feed'>
            <div className="header-ar-trend">Trend</div>
            {error ? (
                <p>{error}</p>
            ) : (
                <div id="rss-feed" className="list-googletrend">
                    {displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div className="card-googletrend" key={index}>
                                <p style={{ fontSize: "12px", textAlign: "left" }}>{item.pubDate}</p>
                                <div className="title-gtrend">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                </div>
                                <div style={{ height: "168px", overflow: "hidden" }}>
                                    {item.picture && <img src={item.picture} alt={item.title} />}
                                </div>
                                <p>{item.snippet}</p>
                                <p>{item.source}</p>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default GoogleTrend;
