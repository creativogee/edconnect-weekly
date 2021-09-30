const { localStorage } = require('../../services/storage');
const baseUrl = require('../../services/getBaseUrl');

const userResetPasswordGet = (req, res) => {
  const token = req.params.token;
  //stored in local storage in case tab is closed
  //token expires anyway
  localStorage.create('rpt', token);
  res.render('ResetPassword', { baseUrl });
};

module.exports = userResetPasswordGet;
