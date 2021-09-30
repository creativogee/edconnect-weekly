const passport = require('passport');

module.exports = {
  /*Initialise the passport module essentially adding the 
  passport object to the express session*/
  passportInit: passport.initialize(),
  /*alter the request object to change the use value from
  session id to the deserialized user object*/
  passportSession: passport.session(),
};
