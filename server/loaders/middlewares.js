const {
  cors,
  flash,
  session,
  json,
  urlencoded,
  passportInit,
  passportSession,
  statics,
} = require('../middlewares');
const loggerInstance = require('./logger');

const setUpMiddlewares = (app) => {
  require('../config/passport');

  app.use(cors);
  app.use(flash);
  app.use(session);
  app.use(json);
  app.use(urlencoded);
  app.use(passportInit);
  app.use(passportSession);
  app.use(statics);

  loggerInstance;
};

module.exports = setUpMiddlewares;
