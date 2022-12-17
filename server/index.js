const express = require('express');

const PORT = 3000;
const app = express();

app.get('/', (req, res, next) => res.send('HELLO WORLD!'));

app.listen(PORT);