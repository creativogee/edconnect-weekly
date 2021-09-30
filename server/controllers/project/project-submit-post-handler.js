const projectRes = require('../../services/project');
const User = require('../../services/user');

const projectSubmitPost = async (req, res) => {
  try {
    const { body } = req;
    const { name, abstract } = body;
    const tags = body.tags.split(', ');
    const authors = body.authors.split(', ');
    const user = await User.getById(req.session.user._id);
    const authorImage = user.profileImage;

    const newProject = await projectRes.create({
      name,
      abstract,
      authors,
      tags,
      authorImage,
      createdBy: req.session.user._id,
    });

    if (!newProject[0]) {
      throw 'ProjectCreateError';
    }
    res.redirect('/');
  } catch (e) {
    if (e === 'ProjectCreateError') {
      req.flash('projectError', JSON.stringify(newProject[1]));
      res.redirect(303, '/projects/submit');
    }
  }
};

module.exports = projectSubmitPost;
