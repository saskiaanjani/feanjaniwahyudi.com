import configUrl from '../ConfigUrl';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartArticlesPopular = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularArticles = async () => {
            try {
                const response = await axios.get(`${configUrl.beBaseUrl}/api/articlespop`);

                setArticles(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularArticles();
    }, []);

    if (loading) return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
         <img src="https://www.anjaniwahyudi.com/imgloading.svg" style={{width: '200px', height: '140px'}} alt='imgloading'></img>
    </div>;
    if (error) return <p>Error: {error}</p>;

    const labels = articles.map(article => {
        return article.title.length > 16 ? article.title.slice(0, 16) + '...' : article.title;
    });
    const data = articles.map(article => article.views);
   
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Views',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
    );
};

export default ChartArticlesPopular;
