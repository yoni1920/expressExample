const express = require("express");
const cors = require("cors");
const logger = require('morgan');
require("./dbConnection/db");

const usersController = require('./controllers/usersController');
const chatsController = require('./controllers/chatsController');

const app = express();

app.use(cors());

const port = 3000;

app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersController);
app.use('/chats', chatsController);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
