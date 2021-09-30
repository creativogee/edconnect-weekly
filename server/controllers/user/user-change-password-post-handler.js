const User = require('../../services/user');

const userChangePasswordPost = async (req, res) => {
  try {
    const id = req.session.user._id;
    const response = await User.confirmPassword(id, req.body.currentPassword);
    if (!response) {
      req.flash('changePassError', 'Current password is incorrect');
      res.redirect(303, '/profile');
    } else {
      await User.updatePassword(id, req.body.newPassword);
      res.redirect('/profile');
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userChangePasswordPost;
