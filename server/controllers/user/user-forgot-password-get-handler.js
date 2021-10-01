const { localStorage } = require('../../services/storage');

const userForgotPasswordGet = async (req, res) => {
  const forgotPasswordError = localStorage.getOne('forgotPasswordError');
  res.render('ForgotPassword', { forgotPasswordError });
};

module.exports = userForgotPasswordGet;
