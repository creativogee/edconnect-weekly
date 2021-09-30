const express = require('express');
const app = express();
const { config } = require('./config/env');
const { connectDB } = require('./config/database');
const { setUpMiddlewares } = require('./loaders');
const ssoRoutes = require('./routes/sso-routes');
const homeRoutes = require('./routes/home-routes');
const userRoutes = require('./routes/user-routes');
const projectRoutes = require('./routes/project-routes');

const register = require('@react-ssr/express/register');

register(app).then(async () => {
  //load all middlewares
  setUpMiddlewares(app);

  //load in all routes
  app.use('/', ssoRoutes, homeRoutes, userRoutes, projectRoutes);

  //database connection facade
  await connectDB();

  //set up listening port
  app.listen(config.port, () => console.log('Server listening on port ' + config.port));
});
