require('dotenv').config();

module.exports = {
  config: {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT || 80,
    mongoUri: process.env.MONGODB_URI,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
    facebook_id: process.env.FACEBOOK_APP_ID,
    facebook_secret: process.env.FACEBOOK_APP_SECRET,
    google_id: process.env.GOOGLE_CLIENT_ID,
    google_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_id2: process.env.GOOGLE_CLIENT_ID2,
    google_secret2: process.env.GOOGLE_CLIENT_SECRET2,
    refresh_token: process.env.REFRESH_TOKEN,
    baseUrl: process.env.BASE_URL,
    reset_password_secret: process.env.RESET_PASSWORD_SECRET,
    session_secret: process.env.SESSION_SECRET,
  },
};
