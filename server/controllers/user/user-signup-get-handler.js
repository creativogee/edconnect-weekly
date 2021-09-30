const { getGradYears, getPrograms } = require('../../services/school');
const programs = getPrograms();
const graduationYears = getGradYears();

const userSignUpGet = (req, res) => {
  const user = req.session.user;
  const errorJson = req.flash('signupError')[0];
  const inputJson = req.flash('signupInput')[0];

  let error;
  let input;
  if (errorJson && inputJson) {
    error = JSON.parse(errorJson);
    input = JSON.parse(inputJson);
  }

  if (user) {
    res.render('Signup', { programs, graduationYears, error, input, user });
  } else {
    res.render('Signup', { programs, graduationYears, error, input });
  }
};

module.exports = userSignUpGet;
