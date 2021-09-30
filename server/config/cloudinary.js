const { config } = require('./env');
require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_key,
  api_secret: config.cloudinary_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'project-explorer',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 50, height: 50, crop: 'limit' }],
});

module.exports = {
  storage,
};
