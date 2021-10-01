const { Router } = require('express');
const { File } = require('../middlewares');
const profileImage = new File('profileImage');

const router = Router();

const {
  userLoginGet,
  userLoginPost,
  userSignUpGet,
  userSignUpPost,
  userForgotPasswordGet,
  userForgotPasswordPost,
  userResetPasswordGet,
  userResetPasswordPost,
  userProfileGet,
  userProfilePost,
  userChangePasswordPost,
  userLogoutGet,
} = require('../controllers/user');

//user login routes
router.route('/login').get(userLoginGet).post(userLoginPost);

//user logout route
router.route('/logout').get(userLogoutGet);

//user signup routes
router.route('/signup').get(userSignUpGet).post(userSignUpPost);

//user forgot password routes
router.route('/forgot-password').get(userForgotPasswordGet).post(userForgotPasswordPost);

//user reset password routes
router.route('/reset-password/:token').get(userResetPasswordGet);
router.route('/reset-password').post(userResetPasswordPost);

//user profile routes
router.route('/profile').get(userProfileGet).post(profileImage.upload, userProfilePost);

//user change password
router.route('/change-password').post(userChangePasswordPost);

module.exports = router;
