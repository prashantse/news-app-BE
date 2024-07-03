// routes/news.js

const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');

// Fetch news articles for a specific topic
router.get('/:topic', async (req, res) => { 
  const { topic } = req.params;

  try {
    const articles = await newsService.fetchNews(topic);

    // Respond with the fetched articles
    res.json(articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
