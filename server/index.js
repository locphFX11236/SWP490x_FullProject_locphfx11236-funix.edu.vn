const express = require('express');
const cors = require('cors');

const Database = require('./config/database');
const { showRoutes, authRoutes } = require('./routes');
// const CloneSamples = require('./data/handle');

const MONGODB_URI = 'mongodb://localhost:27017/charity_app_dev';
const PORT = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Các Routes
app.use(showRoutes);
app.use(authRoutes);

// Handle to database
Database(
    () => app.listen(PORT),
    MONGODB_URI
);
// CloneSamples.CloneData('All');
// CloneSamples.Tool();