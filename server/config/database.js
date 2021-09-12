//Refactored and modularized the database config for reusability

require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("bufferCommands", false)

const conn = process.env.MONGODB_URI
const mongoDefault = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

//Establish database connection
const connectDB = async () => {
  try {
    await mongoose.connect(conn, mongoDefault)
    if (process.env.NODE_ENV == "dev") {
      console.log("Database connection successful")
    }
  } catch (e) {
    console.log(e)
    console.log("Database connection failed")
  }
}

//Terminates connection to database
const disconnectDB = async () => {
  try {
    await mongoose.connection.close()
  } catch (e) {
    console.log("Database failed to disconnect")
  }
}

module.exports = { connectDB, disconnectDB }
