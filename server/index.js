const express = require('express');

const Database = require('./config/database');
// const CloneSamples = require('./data/handle');

const MONGODB_URI = 'mongodb://localhost:27017/charity_app_dev';
const PORT = 3000;
const app = express();

app.get('/', (req, res, next) => res.send('Hello world!!'));

// Handle to database
Database(
    () => app.listen(PORT),
    MONGODB_URI
);
// CloneSamples.CloneData('All');
// CloneSamples.Tool();