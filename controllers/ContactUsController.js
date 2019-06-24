const express = require('express');
const axios = require('axios');
const Validator = require('../common/Validator');

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
  axios(options)
    .then((response) => {
      if (!response.data.success || response.data.score <= 0.5) {
        return res.status(403).send('Sorry, only humans is allowed to send us a message.');
      }
      return res.status(200).send('Thank You! Your message has been sent.');
    })
    .catch(() => res.status(403).send('There was a problem with your submission, please try again.'));
};


router.post('/', processContact);

module.exports = router;
