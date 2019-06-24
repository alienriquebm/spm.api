const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const mail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASS, // generated ethereal password
  },
});

module.exports = mail;
