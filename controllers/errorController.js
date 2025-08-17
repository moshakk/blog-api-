const AppError = require('./../utils/appError');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error -> ', err);
    res.status(500).json({
      status: 'error',
      message: 'something went very bad',
    });
  }
};

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 404;
    err.status = 'fail';
    err.message = `can not find ${req.originalUrl} on this server`;
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res, next);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
