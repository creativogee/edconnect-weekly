const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }))

router.get(
  "/auth/facebook/project-explorer",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.user = req.user
    res.redirect("/")
  }
)

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))

router.get(
  "/auth/google/project-explorer",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.user = req.user
    res.redirect("/")
  }
)

module.exports = router
