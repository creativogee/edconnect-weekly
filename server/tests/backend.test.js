const { config } = require('../config/env');
import regeneratorRuntime from 'regenerator-runtime';
const User = require('../services/user');
const { userOne, connectDB, disconnectDB } = require('./fixtures/db');

const OLD_ENV = process.env;

beforeAll(async () => {
  //changes node environment to test
  process.env = { NODE_ENV: 'test', ...OLD_ENV };
  await connectDB();
});

afterAll(async () => {
  await User.deleteUser({ email: userOne.email });
  disconnectDB();
  //resets environment back to original
  process.env = OLD_ENV;
});

test('should register new user', async () => {
  const user = (await User.create(userOne))[1];
  expect(userOne.firstname).toEqual(user.firstname);
});
