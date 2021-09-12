const express = require("express")
const router = express.Router()
const passport = require("passport")

//Facebook SSO routes
//Facebook Authentication
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }))

//Project Explorer Auntentication via facebook
router.get(
  "/auth/facebook/project-explorer",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    const { user } = req
    req.session.user = user
    if (!user.graduationYear && !user.matricNumber && !user.program) {
      //redirects to route to complete registration for new user
      res.redirect("/profile")
    } else {
      //redirects to home or returning user
      res.redirect("/")
    }
  }
)

//Google SSO routes
//Google Authentication
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))

router.get(
  "/auth/google/project-explorer",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    const { user } = req
    req.session.user = user
    if (!user.graduationYear && !user.matricNumber && !user.program) {
      //redirects to route to complete registration for new user
      res.redirect("/profile")
    } else {
      //redirects to home or returning user
      res.redirect("/")
    }
  }
)

module.exports = router
