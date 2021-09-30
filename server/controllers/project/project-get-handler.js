const projectRes = require('../../services/project');
const User = require('../../services/user');

const projectGet = async (req, res) => {
  const projectId = req.params.id;
  const project = await projectRes.getById(projectId);
  const userId = project.createdBy;
  const user = await User.getById(userId);
  const creator = { firstname: user.firstname, lastname: user.lastname };
  const authorImage = project?.authorImage;
  const oldUser = true;

  if (!project) {
    res.redirect('/');
  }
  if (req.session.user) {
    res.render('Project', { project, user, creator, authorImage, oldUser });
  } else {
    res.render('Project', { project, creator, authorImage, oldUser });
  }
};

module.exports = projectGet;
