const express = require("express")
const router = express.Router()
const project = require("../services/project")
const store = require("store")
const User = require("../services/user")

router.get("/", async (req, res) => {
  const data = await project.getAll()
  const user = await User.getById(req.session?.user?._id)
  if (user) {
    res.render("Home", { data, user })
  } else {
    res.render("Home", { data })
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy()
  //deletes the upadte JSON from the local storage
  store.clearAll()

  res.redirect("/")
})

module.exports = router
