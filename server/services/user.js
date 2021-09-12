// imports
const mongoose = require("mongoose")
const User = require("../models/user")
const helper = require("../models/mongo_helper")
const crypto = require("crypto")

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

const deleteUser = async obj => {
  try {
    return await User.deleteOne({ ...obj })
  } catch (e) {
    return [false, ["Something went wrong, please try again"]]
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

/**
 *  Checks if a user with the provider id exist in the DB
 * @param {string} provider This could either be facebook or google
 * @param {string} _id
 * @returns user object
 */
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

const getUser = async obj => {
  const user = await User.findOne({ ...obj })
  return user
}

/**
 * Adds a reset password token to a specified user's document
 * @param {string} id
 * @param {string} token
 * @returns
 */
const updateUserToken = async (id, token) => {
  const user = await User.findById(id)
  return await user.updateOne({ resetPasswordToken: token })
}

const updateUser = async (id, data) => {
  const user = await User.findById(id)
  return await user.updateOne({ ...data })
}

/**
 * Updates the user's password with the new one
 * @param {string} id
 * @param {string} pwd
 */
const updatePassword = async (id, pwd) => {
  const user = await User.findById(id)
  await user.setPassword(pwd)
  user.resetPasswordToken = ""
  user.save()
}

/**
 * Compare provided password with the hashed password from the DB
 * @param {string} id
 * @param {string} pwd
 * @returns boolean
 */
const confirmPassword = async (id, pwd) => {
  const user = await User.findById(id)
  const newHash = crypto.pbkdf2Sync(pwd, user.salt, 1000, 64, "sha512").toString("hex")
  return user.password === newHash
}

module.exports = {
  create,
  deleteUser,
  authenticate,
  getById,
  getAll,
  findByProviderId,
  getUser,
  updateUser,
  updateUserToken,
  updatePassword,
  confirmPassword,
}
