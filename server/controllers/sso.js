const ssoHandler = function (req, res) {
  const { user } = req;
  req.session.user = user;
  if (!user.graduationYear && !user.matricNumber && !user.program) {
    //redirects to route to complete registration for new user
    res.redirect('/profile');
  } else {
    //redirects to home for returning user
    res.redirect('/');
  }
};

module.exports = { ssoHandler };
