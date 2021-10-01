const User = require('../../services/user');
const { getGradYears, getPrograms } = require('../../services/school');
const programs = getPrograms();
const graduationYears = getGradYears();

const userProfileGet = async (req, res) => {
  try {
    const user = await User.getById(req.session.user._id);
    const changePassJson = req.flash('changePassRes')[0];
    let changePass;
    if (changePassJson) {
      changePass = JSON.parse(changePassJson);
    }
    if (!user) {
      res.redirect('/login');
    } else {
      res.render('Profile', { user, programs, graduationYears, changePass });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userProfileGet;
