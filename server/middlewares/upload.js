const multer = require('multer');
const { storage } = require('../config/cloudinary');
const parser = multer({ storage });

const upload = {
  to: (dir) => parser.single(dir),
};

module.exports = upload;
