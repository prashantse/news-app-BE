// server.js

const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/news');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://PrashantSharma:prashant123@cluster007.zrel9cq.mongodb.net/news-aggregator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
