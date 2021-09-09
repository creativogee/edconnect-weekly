const nodemailer = require("nodemailer")
const { google } = require("googleapis")

const FROM_EMAIL = process.env.FROM_EMAIL
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID2
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET2
const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const createEmail = async (receiver, token) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "omowole.gbenga@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    })

    let mailOptions = {
      from: "Creativogee <omowole.gbenga@gmail.com>",
      to: receiver,
      subject: "Reset Your Password",
      text: "Hello from Creativogee",
      html: `
      <h3> Hi there!</h3>
      <p> Please click on this link below to reset your password</p>
      <a href="http://localhost:4000/reset-password/${token}"> Click Here</a>
      `,
    }
    return await transport.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createEmail,
}