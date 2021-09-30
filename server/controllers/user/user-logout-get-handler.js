const { localStorage } = require('../../services/storage');

const userLogoutGet = (req, res) => {
  req.session.destroy();
  //deletes the upadte JSON from the local storage
  localStorage.drop();

  res.redirect('/');
};

module.exports = userLogoutGet;
