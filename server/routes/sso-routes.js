const { Router } = require('express');
const passport = require('passport');
const { ssoHandler } = require('../controllers/sso');

const router = Router();

//Facebook SSO routes
//Facebook Authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

//Project Explorer Auntentication via facebook
router.get(
  '/auth/facebook/project-explorer',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  ssoHandler,
);

//Google SSO routes
//Google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/auth/google/project-explorer',
  passport.authenticate('google', { failureRedirect: '/login' }),
  ssoHandler,
);

module.exports = router;
