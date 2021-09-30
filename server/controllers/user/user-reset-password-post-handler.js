const jwt = require('jsonwebtoken');
const { config } = require('../../config/env');
const User = require('../../services/user');
const { localStorage } = require('../../services/storage');

const userResetPasswordPost = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password.length < 7) {
      throw Error('Password is too short');
    }

    if (password !== confirmPassword) {
      throw Error('Passwords do not match');
    }

    const token = storage.getOne('rpt');
    if (token) {
      const decoded = jwt.verify(token, config.reset_password_secret);
      User.updatePassword(decoded._id, password);
      localStorage.deleteOne('rpt');
      res.redirect('/login');
    } else {
      throw Error('Invalid or expired token');
    }
  } catch (e) {
    console.log(e.message);
    res.render('ResetPassword', { error: e.message });
  }
};

module.exports = userResetPasswordPost;
