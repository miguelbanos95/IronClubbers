const nodemailer = require('nodemailer');
const templateActivation = require('./mailtemplate');
const templateUserIssue = require('./mailerplate-userIssue');

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

module.exports.issueUser = (email, userMessage, name) => {
  transporter.sendMail({
    from: email,
    to: 'info.ironclubbers@gmail.com',
    subject: `Asunto de: ${email}`,
    html: templateUserIssue.generateEmail(userMessage, name)
  })
}
