require("dotenv").config()
const baseUrl = process.env.BASE_URL ?? `http://localhost:${process.env.PORT}`
module.exports = baseUrl
