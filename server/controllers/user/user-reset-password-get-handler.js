const { localStorage } = require('../../services/storage');
const baseUrl = require('../../services/getBaseUrl');

const userResetPasswordGet = (req, res) => {
  const error = req.flash('ResetPasswordError')[0];
  const token = req.params.token;
  //stored in local storage in case tab is closed
  //token expires anyway
  localStorage.setOne({ rpt: token });
  res.render('ResetPassword', { baseUrl, error });
};

module.exports = userResetPasswordGet;
