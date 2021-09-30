const User = require('../../services/user');

const userProfilePost = async (req, res) => {
  try {
    const id = req.session.user._id;

    const { firstName, lastName } = req.body;
    let graduationYear, program;

    //Handling lack of selection from the client
    if (graduationYear === 'Select Graduation Year') {
      graduationYear = '';
    }
    if (program === 'Select Program') {
      program = '';
    }

    const oldUser = await User.getById(id);
    const user = {
      program,
      graduationYear,
      firstname: firstName,
      lastname: lastName,
      profileImage: oldUser.profileImage,
      ...req.body,
    };

    if (
      req.file &&
      req.file.path !==
        'https://spng.pngfind.com/pngs/s/500-5008297_lars-christian-larsen-user-profile-image-png-transparent.png'
    ) {
      user.profileImage = req.file.path;
    }

    //update user's document with the fields defined in the user object
    await User.updateUser(id, user);

    const succ = 'Updated Successful!';
    res.render('Profile', { user, programs, graduationYears, succ });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userProfilePost;
