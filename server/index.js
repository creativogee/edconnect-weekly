require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const flash = require("express-flash")
const passport = require("passport")
const { connectDB } = require("./config/database")
require("./config/passport")

const app = express()

const ssoRoutes = require("./controllers/sso")
const homeRoutes = require("./controllers/home")
const userRoutes = require("./controllers/user")
const projectRoutes = require("./controllers/project")

const register = require("@react-ssr/express/register")

const SERVER_PORT = process.env.PORT || 80

//created a mongoDB collection to be used as session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
})

register(app).then(() => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  //morgan to log only status code >=400, essentially failed requests
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
  })
  app.use(flash())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(
    session({
      secret: "secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store, //utilizing above initialized mongodb store
      resave: true,
      saveUninitialized: false,
    })
  )

  /*Initialise the passport module essentially adding the 
  passport object to the express session*/
  app.use(passport.initialize())
  /*alter the request object to change the use value from
  session id to the deserialized user object*/
  app.use(passport.session())

  //load in all routes
  app.use("/", ssoRoutes, homeRoutes, userRoutes, projectRoutes)

  app.use(express.static("public"))

  app.listen(SERVER_PORT, () => console.log("Server listening on port " + SERVER_PORT))

  //database connection facade
  connectDB()
})
