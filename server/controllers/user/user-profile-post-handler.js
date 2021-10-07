const _ = require('lodash');
const User = require('../../services/user');
const Project = require('../../services/project');
const { getGradYears, getPrograms } = require('../../services/school');
const programs = getPrograms();
const graduationYears = getGradYears();

const userProfilePost = async (req, res) => {
  try {
    const id = req.session.user._id;

    const { firstName, lastName, matricNumber, email } = req.body;
    let graduationYear, program;

    //Handling lack of selection from the client
    if (req.body.graduationYear === 'Select Graduation Year') {
      graduationYear = '';
    } else {
      graduationYear = req.body.graduationYear;
    }

    if (req.body.program === 'Select Program') {
      program = '';
    } else {
      program = req.body.program;
    }

    const oldUser = await User.getById(id);
    const user = {
      program,
      graduationYear,
      firstname: firstName,
      lastname: lastName,
      profileImage: oldUser.profileImage,
      matricNumber,
      email,
    };

    if (
      req.file &&
      req.file.path !==
        'https://spng.pngfind.com/pngs/s/500-5008297_lars-christian-larsen-user-profile-image-png-transparent.png'
    ) {
      user.profileImage = req.file.path;
    }

    const checkUser = oldUser.toObject();

    delete checkUser.resetPasswordToken;
    delete checkUser._id;
    delete checkUser.facebookId;
    delete checkUser.salt;
    delete checkUser.__v;
    delete checkUser.createdAt;
    delete checkUser.updatedAt;
    delete checkUser.password;

    let succ, err;

    if (_.isEqual(user, checkUser)) {
      err = 'Nothing to update!';
    } else {
      //update user's document with the fields defined in the user object
      await User.updateUser(id, user);
      //update author image for
      await Project.update({ createdBy: id }, { authorImage: user.profileImage });
      succ = 'Updated successful!';
    }

    res.render('Profile', { user, programs, graduationYears, succ, err });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userProfilePost;
