const errorHandler = (req, res, next) => {
  console.log("validating user");
  next();
};

module.exports = errorHandler;
