const express = require('express');
const axios = require('axios');
const Validator = require('../common/Validator');
const mail = require('../config/mail');

const router = express.Router();

const processContact = async (req, res) => {
  const body = req.only('recaptcha', 'data');
  const rules = {
    rules: {
      recaptcha: 'required',
      data: {
        name: 'required',
        email: 'required|email',
        message: 'required',
      },
    },
  };
  const isValid = await Validator.doValidation(body, rules);

  if (isValid !== true) {
    return res.formValidationError(isValid);
  }

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: `secret=${process.env.RECAPTCHA_SECRET}&response=${req.body.recaptcha}`,
    url: process.env.RECAPTCHA_URL_VERIFY,
  };

  try {
    const recaptchaVerify = await axios(options);
    if (!recaptchaVerify.data.success || recaptchaVerify.data.score <= 0.5) {
      return res.status(403).send('Sorry, only humans is allowed to send us a message.');
    }
    try {
      const info = await mail.sendMail({
        from: `"${body.data.name} <${body.data.email}>"`, // sender address
        to: 'info@sanbricdesigns.com.ve', // list of receivers
        subject: 'New contact from sanbricdesigns.com', // Subject line
        text: body.data.message, // plain text body
      });
      // eslint-disable-next-line no-console
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      return res.status(200).send('Thank You! Your message has been sent.');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(403).send('There was a problem with your submission, please try again.');
    }
  } catch (error) {
    return res.status(403).send('There was a problem with your submission, please try again.');
  }
};


router.post('/', processContact);

module.exports = router;
