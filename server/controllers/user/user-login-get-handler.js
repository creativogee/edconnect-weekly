const userLoginGet = (req, res) => {
  const user = req.session.user;
  const error = req.flash('loginError')[0];
  if (user) {
    res.render('Login', { error, user });
  } else {
    res.render('Login', { error });
  }
};

module.exports = userLoginGet;
