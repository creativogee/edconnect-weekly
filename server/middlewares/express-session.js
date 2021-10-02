const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { config } = require('../config/env');

//created a mongoDB collection to be used as session store
const store = new MongoDBStore(
  {
    uri: config.mongoUri,
    collection: 'project-explorer-sessions',
  },
  (e) => {
    if (e) {
      console.log('Express session error');
    }
  },
);

const sessionInstance = session({
  secret: config.session_secret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store, //utilizing above initialized mongodb store
  resave: true,
  saveUninitialized: true,
});

module.exports = sessionInstance;
