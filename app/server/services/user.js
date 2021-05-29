// imports
const User = require("../models/user")
const helper = require("../models/mongo_helper")

/* Creates new user */
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      matricNumber,
      program,
      graduationYear,
    })
    user.setPassword(password)

    const newUser = await user.save()

    if (newUser) {
      return [true, user]
    }
  } catch (e) {
    return [false, helper.translateError(e)]
  }
}

/* Authenticate a user */
const authenticate = async (email, password) => {
  let validUser, validPassword
  validUser = await User.findOne({ email })
  if (validUser) {
    validPassword = User.validPassword(validUser, password)
  }

  const isValid = validUser.password === validPassword
  if (isValid) {
    return [true, validUser]
  } else {
    return [false, ["Invalid email/password"]]
  }
}

/* Return user with specified id */
const getById = async (id) => {
  return await User.findById(id)
}

/* Return all users */
const getAll = async () => {
  return await User.find()
}

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
}
