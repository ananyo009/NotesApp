async function errorHandler(err, req, res, next) {
  const response = {
    message: await err.message,
  };

  res.status(err.status).json(response);
}

module.exports = errorHandler;