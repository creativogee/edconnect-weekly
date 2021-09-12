const mongoose = require("mongoose")
const { connectDB, disconnectDB } = require("../../config/database")

const userOne = {
  firstname: "logan",
  lastname: "paul",
  email: "logan@paul.com",
  matricNumber: "110704046",
  program: "survey",
  graduationYear: "2016",
  password: "passme12345",
}

module.exports = {
  userOne,
  connectDB,
  disconnectDB,
}
