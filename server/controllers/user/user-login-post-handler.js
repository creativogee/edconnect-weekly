const User = require('../../services/user');
const { localStorage } = require('../../services/storage');

const userLoginPost = async (req, res) => {
  const { email, password } = req.body;
  const isValid = await User.authenticate(email, password);

  if (isValid[0]) {
    req.session.user = isValid[1];
    localStorage.setOne({ user: isValid[1] });
    res.redirect('/');
  } else {
    req.flash('loginError', 'true');
    res.redirect(303, '/login');
  }
};

module.exports = userLoginPost;
