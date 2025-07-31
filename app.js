const express = require('express');
const morgan = require('morgan');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express(); // create an express application

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/posts/:id/comments', commentRoutes);
module.exports = app;
