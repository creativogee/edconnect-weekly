const jwt = require('jsonwebtoken');
const { config } = require('../../config/env');
const User = require('../../services/user');
const { localStorage } = require('../../services/storage');

const userResetPasswordPost = async (req, res) => {
  const token = localStorage.getOne('rpt');

  try {
    const { password, confirmPassword } = req.body;
    if (!password) throw Error('Password cannot be empty');
    if (!confirmPassword) throw Error('Please confirm your password');
    if (password.length < 7) throw Error('Password is too short');
    if (password !== confirmPassword) throw Error('Passwords do not match');
    if (!token) throw Error('Invalid or expired token');

    const decoded = jwt.verify(token, config.reset_password_secret);
    User.updatePassword(decoded._id, password);
    localStorage.deleteOne('rpt');
    req.flash('ResetPasswordSuccess', 'Password reset successful');
    res.redirect('/login');
  } catch (e) {
    console.log(e.message);
    req.flash('ResetPasswordError', e.message);
    res.redirect(303, `/reset-password/${token}`);
  }
};

module.exports = userResetPasswordPost;
