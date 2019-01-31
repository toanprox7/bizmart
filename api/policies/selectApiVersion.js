module.exports = function(req, res, next) {

  // Alter the URL based on the desired API version
  req.url = "/api" + (sails.config.apiVersion || 1) + req.url;
  return next();

};
