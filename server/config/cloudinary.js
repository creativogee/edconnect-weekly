require("dotenv").config()
require("express")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "project-explorer",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 50, height: 50, crop: "limit" }],
})

module.exports = {
  storage,
}
