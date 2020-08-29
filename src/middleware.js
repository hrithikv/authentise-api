const errorLogger = (err, req, res, next) => {  
  res.status(err.status || 400).send({ errorMessage: err.message });
};

const validateToken = (err, req, res, next) => {  
  next();
};

export { errorLogger, validateToken };
