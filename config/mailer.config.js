const nodemailer = require('nodemailer');
const templateActivation = require('./mailtemplate');



const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASSWORD
  }
})


module.exports.sendActivationEmail = (email,token) => {
  transporter.sendMail({
    from: `Pedro from ironClubbers !!!!! <${process.env.NM_USER}>`,
    to: email,
    subject: "Activation Email",
    html: templateActivation.generateEmail(token)
  })
}
