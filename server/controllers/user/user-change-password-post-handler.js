const User = require('../../services/user');

const userChangePasswordPost = async (req, res) => {
  try {
    const id = req.session.user._id;

    const confirm = await User.confirmPassword(id, req.body.currentPassword);
    const compare = await User.comparePassword(req.body.newPassword, req.body.confirmPassword);
    const response = !compare?.success ? compare : confirm;

    console.log('response:', response);

    req.flash('changePassRes', JSON.stringify(response));
    if (!response?.success) {
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
