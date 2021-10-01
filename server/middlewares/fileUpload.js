const multer = require('multer');
const { storage } = require('../config/cloudinary');
const parser = multer({ storage });

class File {
  constructor(dir) {
    this._dir = dir;
  }

  get upload() {
    return parser.single(this._dir);
  }
}

module.exports = File;
