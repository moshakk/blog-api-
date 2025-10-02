const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoute');
const { swaggerUi, specs } = require('./swagger');

const app = express(); // create an express application
app.use(cors());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customSiteTitle: 'Blog API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
// Root route (for Railway health check + friendly message)
app.get('/', (req, res) => {
  res.send('Blog API is running... Visit /api-docs for Swagger UI');
});
// Clean routes without conflicts
// need to updated and make it more logical
app.use('/api/posts', postRoutes);
//app.use('/api/posts', commentRoutes);
//app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

//Error handling middleware - now properly configured -- cause a crashing ->pathToRegexpError only at express 5
// app.all('/(.*)', (req, res, next) => {
//   next(new AppError(`can not find ${req.originalUrl} on this server `, 404));
// });

//Alternative solution
app.use((req, res, next) => {
  next(new AppError(`can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);

module.exports = app;
