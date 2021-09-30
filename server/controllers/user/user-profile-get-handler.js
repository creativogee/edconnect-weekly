const User = require('../../services/user');

const userProfileGet = async (req, res) => {
  try {
    const user = await User.getById(req.session.user._id);
    const yikes = req.flash('changePassError')[0];
    if (!user) {
      res.redirect('/login');
    } else {
      res.render('Profile', { user, programs, graduationYears, yikes });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userProfileGet;
