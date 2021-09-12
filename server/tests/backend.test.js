require("dotenv").config()
import regeneratorRuntime from "regenerator-runtime"
const User = require("../services/user")
const { userOne, connectDB, disconnectDB } = require("./fixtures/db")

beforeAll(async () => {
  const OLD_ENV = process.env
  process.env = { NODE_ENV: "test", ...OLD_ENV }
  await connectDB()
})

afterAll(async () => {
  await User.deleteUser({ email: userOne.email })
  disconnectDB()
})

test("should register new user", async () => {
  const user = (await User.create(userOne))[1]
  expect(userOne.firstname).toEqual(user.firstname)
})
