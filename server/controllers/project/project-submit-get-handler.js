const projectSubmitGet = async (req, res) => {
  const user = req.session.user;
  const errorJson = req.flash('projectError');

  let error;
  if (errorJson.length > 0) {
    error = JSON.parse(errorJson[0]);
  }

  if (!user) {
    res.redirect('/login');
  } else {
    res.render('CreateProject', { error, user });
  }
};

module.exports = projectSubmitGet;
