// services/newsService.js

const axios = require('axios');

const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = 'd93b04d15d884c22acc70518703a99ee'; 

async function fetchNews(topic) {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: topic,
      //  country: 'us', // Example: Fetch news from the US
        apiKey: API_KEY,
        sortBy: 'publishedAt',
        pageSize: 10, // Adjust as needed
      },
    });

    const articles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
        url: article.source.url,
      },
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

module.exports = {
  fetchNews,
};
