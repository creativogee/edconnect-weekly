require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const session = require("express-session")
const flash = require("express-flash")
const app = express()

const register = require("@react-ssr/express/register")

register(app).then(() => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.use(morgan("combined"))
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
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      resave: true,
      saveUninitialized: true,
    })
  )

  app.use("/api", require("./routes/api"))
  // app.use(express.static("public"))
  app.use("/", require("./controllers/home"))
  app.use("/", require("./controllers/user"))
  app.use("/", require("./controllers/project"))
  app.listen(SERVER_PORT, () => console.log("Server listening on port " + SERVER_PORT))
})
const SERVER_PORT = process.env.SERVER_PORT
