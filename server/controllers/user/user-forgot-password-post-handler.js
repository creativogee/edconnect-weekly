const { config } = require('../../config/env');
const User = require('../../services/user');
const { sendEmail } = require('../../services/mailer');

const userForgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.getUser({ email });
    if (!user) {
      res.render('ForgotPassword', { error: 'User does not exist', userEmail: email });
    }

    if (user) {
      //generates a token that expires after 5 minutes
      const token = jwt.sign({ _id: user._id }, config.reset_password_secret, {
        expiresIn: '24h',
      });
      await User.updateUserToken(user._id, token);
      await sendEmail(email, token);
      res.render('ForgotPassword', { userEmail: email });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = userForgotPasswordPost;
