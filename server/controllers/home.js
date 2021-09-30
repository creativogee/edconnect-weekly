const project = require('../services/project');
const User = require('../services/user');

const dashboard = async (req, res) => {
  const data = await project.getAll();
  const user = await User.getById(req.session?.user?._id);
  if (user) {
    res.render('Home', { data, user });
  } else {
    res.render('Home', { data });
  }
};

module.exports = { dashboard };
