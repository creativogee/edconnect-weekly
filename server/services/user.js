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
  facebookId,
  googleId,
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
      facebookId,
      googleId,
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
  try {
    let validUser, validPassword

    validUser = await User.findOne({ email })

    if (!validUser) {
      throw "UserLoginError"
    }

    validPassword = User.validPassword(validUser, password)

    const isValid = validUser.password === validPassword

    if (!isValid) {
      throw "UserLoginError"
    }

    return [true, validUser]
  } catch (e) {
    if (e === "UserLoginError") {
      return [false, ["Invalid email/password"]]
    }
  }
}

/* Return user with specified id */
const getById = async id => {
  return await User.findById(id)
}

const findByProviderId = async (provider, _id) => {
  if (provider === "facebook") {
    return await User.find({ facebookId: _id })
  }

  if (provider === "google") {
    return await User.find({ googleId: _id })
  }
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
  findByProviderId,
}
