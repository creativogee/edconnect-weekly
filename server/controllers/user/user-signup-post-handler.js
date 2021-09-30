const User = require('../../services/user');

const userSignUpPost = async (req, res) => {
  const { firstName, lastName, ...others } = req.body;
  const body = { firstname: firstName, lastname: lastName, ...others };
  const user = await User.create(body);

  if (user[0]) {
    req.session.user = user[1];
    res.redirect('/');
  } else {
    req.flash('signupInput', JSON.stringify(req.body));
    req.flash('signupError', JSON.stringify(user[1]));
    res.redirect(303, '/signup');
  }
};

module.exports = userSignUpPost;
