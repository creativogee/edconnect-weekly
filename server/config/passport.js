require("dotenv").config()
const User = require("../services/user")
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy

const baseUrl = process.env.BASE_URL ?? "http://localhost:4000"

const facebookCreds = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: `${baseUrl}/auth/facebook/project-explorer`,
  profileFields: ["id", "first_name", "last_name", "emails"],
}

const googleCreds = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${baseUrl}/auth/google/project-explorer`,
}

const facebookVerify = async (accessToken, refreshToken, profile, done) => {
  const { provider, id } = profile
  const user_exist = (await User.findByProviderId(provider, id))[0]

  if (user_exist) {
    done(null, user_exist)
  }

  if (!user_exist) {
    const { first_name, last_name, email, id } = profile._json
    const body = {
      firstname: first_name,
      lastname: last_name,
      password: id,
      email,
      facebookId: id,
    }
    const user = (await User.create(body))[1]
    done(null, user)
  }
}

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  const { provider, id } = profile
  const user_exist = (await User.findByProviderId(provider, id))[0]

  if (user_exist) {
    done(null, user_exist)
  }

  if (!user_exist) {
    const { given_name, family_name, email, sub } = profile._json
    const body = {
      firstname: given_name,
      lastname: family_name,
      password: sub,
      email,
      googleId: sub,
    }
    const user = (await User.create(body))[1]
    done(null, user)
  }
}

const facebookStrategy = new FacebookStrategy(facebookCreds, facebookVerify)
const googleStrategy = new GoogleStrategy(googleCreds, googleVerify)
passport.use(facebookStrategy)
passport.use(googleStrategy)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (userId, done) {
  User.getById(userId)
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err))
})
