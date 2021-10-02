const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// require("./dbConnection/db");

const profileController = require('./Controllers/profileController');
const wordController = require('./Controllers/wordController');
const postController = require('./Controllers/postController');

const app = express();

app.use(cors());

const port = 8080;

app.use(logger('dev'));
app.use(express.json());

app.use('/profile', profileController);
app.use('/words', wordController);
app.use('/posts', postController);

// Rest Setup
const restServer = app.listen(port, () => console.log(`RestServer is listening on port ${port}`));
