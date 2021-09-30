const morgan = require('morgan');

//morgan to log only status code >=400, essentially failed requests
module.exports = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
});
