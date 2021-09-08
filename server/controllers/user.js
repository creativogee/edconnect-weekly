const express = require("express")
const router = express.Router()
const { createEmail } = require("../services/mailer")
const User = require("../services/user")
const jwt = require("jsonwebtoken")
const store = require("store")

router.get("/signup", (req, res) => {
  const user = req.session.user
  const response = require("../services/school")
  const programs = response.getPrograms()
  const graduationYears = response.getGradYears()
  const errorJson = req.flash("signupError")[0]
  const inputJson = req.flash("signupInput")[0]

  let error
  let input
  if (errorJson && inputJson) {
    error = JSON.parse(errorJson)
    input = JSON.parse(inputJson)
  }

  if (user) {
    res.render("Signup", { programs, graduationYears, error, input, user })
  } else {
    res.render("Signup", { programs, graduationYears, error, input })
  }
})

router.post("/signup", async (req, res) => {
  const { firstName, lastName, ...others } = req.body
  const body = { firstname: firstName, lastname: lastName, ...others }
  const user = await User.create(body)

  if (user[0]) {
    req.session.user = user[1]
    res.redirect("/")
  } else {
    req.flash("signupInput", JSON.stringify(req.body))
    req.flash("signupError", JSON.stringify(user[1]))
    res.redirect(303, "/signup")
  }
})

router.get("/login", (req, res) => {
  const user = req.session.user
  console.log("user:", user)
  const error = req.flash("loginError")[0]
  if (user) {
    res.render("Login", { error, user })
  } else {
    res.render("Login", { error })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const isValid = await User.authenticate(email, password)

  if (isValid[0]) {
    req.session.user = isValid[1]
    res.redirect("/")
  } else {
    req.flash("loginError", "true")
    res.redirect(303, "/login")
  }
})

router.get("/forgot-password", async (req, res) => {
  res.render("ForgotPassword")
})

router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.getUser({ email })
    if (!user) {
      res.render("ForgotPassword", { error: "User does not exist", userEmail: email })
    }

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SECRET, {
        expiresIn: "30m",
      })
      await User.updateUser(user._id, token)
      // await User.updateUser({ resetPasswordToken: token })
      await createEmail(email, token)
      res.render("ForgotPassword", { userEmail: email })
    }
  } catch (e) {
    console.log(e.message)
  }
})

router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token
  store.set("rpt", token)
  res.render("ResetPassword", { token })
})

router.post("/reset-password", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body

    if (password.length < 7) {
      throw Error("Password is too short")
    }

    if (password !== confirmPassword) {
      throw Error("Passwords do not match")
    }

    const token = store.get("rpt")
    if (token) {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET)
      User.updatePassword(decoded._id, password)
      store.remove("rpt")
      res.redirect("/login")
    } else {
      throw Error("Invalid or expired token")
    }
  } catch (e) {
    console.log(e.message)
    res.render("ResetPassword", { error: e.message })
  }
})

module.exports = router
