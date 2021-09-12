require("dotenv").config()
const express = require("express")
const router = express.Router()
const { sendEmail } = require("../services/mailer")
const User = require("../services/user")
const jwt = require("jsonwebtoken")
const store = require("store")
const multer = require("multer")
const { storage } = require("../config/cloudinary")
const parser = multer({ storage })

const baseUrl = require("../services/getBaseUrl")

const response = require("../services/school")
const programs = response.getPrograms()
const graduationYears = response.getGradYears()

router.get("/signup", (req, res) => {
  const user = req.session.user
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
      //generates a token that expires after 5 minutes
      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SECRET, {
        expiresIn: "5m",
      })
      await User.updateUserToken(user._id, token)
      await sendEmail(email, token)
      res.render("ForgotPassword", { userEmail: email })
    }
  } catch (e) {
    console.log(e.message)
  }
})

router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token
  //stored in local storage in case tab is closed
  //token expires anyway
  store.set("rpt", token)
  res.render("ResetPassword", { baseUrl })
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

router.get("/profile", async (req, res) => {
  try {
    const user = await User.getById(req.session.user._id)
    const yikes = req.flash("changePassError")[0]
    if (!user) {
      res.redirect("/login")
    } else {
      res.render("Profile", { user, programs, graduationYears, yikes })
    }
  } catch (e) {
    console.log(e.message)
  }
})

router.post("/profile", parser.single("profileImage"), async (req, res) => {
  try {
    const id = req.session.user._id

    const { firstName, lastName } = req.body
    let graduationYear, program
    //Handling lack of selection from the client
    if (graduationYear === "Select Graduation Year") {
      graduationYear = ""
    }
    if (program === "Select Program") {
      program = ""
    }
    const oldUser = await User.getById(id)
    const user = {
      program,
      graduationYear,
      firstname: firstName,
      lastname: lastName,
      profileImage: oldUser.profileImage,
      ...req.body,
    }

    if (
      req.file &&
      req.file.path !==
        "https://spng.pngfind.com/pngs/s/500-5008297_lars-christian-larsen-user-profile-image-png-transparent.png"
    ) {
      user.profileImage = req.file.path
    }

    //update user's document with the fields defined in the user object
    await User.updateUser(id, user)

    const succ = "Updated Successful!"
    res.render("Profile", { user, programs, graduationYears, succ })
  } catch (e) {
    console.log(e.message)
  }
})

//Password change route
router.post("/change-password", async (req, res) => {
  try {
    const id = req.session.user._id
    const response = await User.confirmPassword(id, req.body.currentPassword)
    if (!response) {
      req.flash("changePassError", "Current password is incorrect")
      res.redirect(303, "/profile")
    } else {
      await User.updatePassword(id, req.body.newPassword)
      res.redirect("/profile")
    }
  } catch (e) {
    console.log(e.message)
  }
})

// router.post("/upload", parser.single("profileImage"), async (req, res) => {
//   try {
//     console.log(req.file)
//   } catch (e) {}
// })

module.exports = router
