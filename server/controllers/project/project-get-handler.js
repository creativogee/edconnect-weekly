const projectRes = require('../../services/project');
const User = require('../../services/user');

const projectGet = async (req, res) => {
  const projectId = req.params.id;
  const project = await projectRes.getById(projectId);
  const userId = project.createdBy;
  const author = await User.getById(userId);
  const authorName = { firstname: author.firstname, lastname: author.lastname };
  const authorImage = project?.authorImage;

  if (!project) {
    res.redirect('/');
  }
  if (req.session.user) {
    const user = req.session.user;
    res.render('Project', { project, user, authorName, authorImage });
  } else {
    res.render('Project', { project, authorName, authorImage });
  }
};

module.exports = projectGet;
