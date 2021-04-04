const express = require("express")
const router = express.Router()

router.get("/signup", (req, res) => {
  const response = require("../services/school")
  const programs = response.getPrograms()
  const graduationYears = response.getGradYears()
  const errorJson = req.flash("signupError")[0]
  const inputJson = req.flash("signupInput")[0]

  if (errorJson && inputJson) {
    const error = JSON.parse(errorJson)
    const input = JSON.parse(inputJson)
    res.render("Signup", { programs, graduationYears, error, input })
  }
  res.render("Signup", { programs, graduationYears })
})

router.post("/signup", (req, res) => {
  const response = require("../services/user")
  const user = response.create(req.body)
  if (user[0] === true) {
    req.session.user = user
    res.redirect("/")
  } else {
    req.flash("signupInput", JSON.stringify(req.body))
    req.flash("signupError", JSON.stringify(user[1]))
    res.redirect(303, "/signup")
  }
})

router.get("/login", (req, res) => {
  const error = req.flash("loginError")[0]

  if (error) {
    res.render("Login", { error })
  }
  res.render("Login")
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const response = require("../services/user")
    const isValid = response.authenticate(email, password)
    if (isValid[0] === true) {
      req.session.user = isValid[1]
      res.redirect("/")
    } else {
      req.flash("loginError", "true")
      res.redirect(303, "/login")
    }
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
