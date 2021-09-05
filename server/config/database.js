const mongoose = require("mongoose")

mongoose.set("bufferCommands", false)

const conn = process.env.MONGODB_URI
const mongoDefault = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

const dbconnection = async () => {
  try {
    await mongoose.connect(conn, mongoDefault)
    console.log("Database connection successful")
  } catch (e) {
    console.log("Database connection failed")
  }
}

module.exports = dbconnection
