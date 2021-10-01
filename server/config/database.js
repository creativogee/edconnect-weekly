//Refactored and modularized the database config for reusability
const { config } = require('./env');
const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);

const conn = config.mongoUri;
const mongoDefault = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

//Establish database connection
const connectDB = async () => {
  try {
    await mongoose.connect(conn, mongoDefault);
    if (config.node_env == 'dev') {
      console.log('Database connection successful');
    }
  } catch (e) {
    console.log(e);
    console.log('Database connection failed');
  }
};

//Terminates connection to database
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (e) {
    console.log('Database failed to disconnect');
  }
};

module.exports = { connectDB, disconnectDB };
