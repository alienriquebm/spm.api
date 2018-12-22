const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const Validator = require('../common/Validator');

const simulateLogin = async (req, res) => {
  const body = req.only('email', 'password');

  const rules = {
    rules: {
      email: 'required|email',
      password: 'required',
    },
    messages: {},
  };

  const isValid = await Validator.doValidation(body, rules);
  if (isValid !== true) {
    return res.returnValidationError(isValid);
  }
  return res.json({ status: 'ok' });
};

router.post('/login', simulateLogin);

module.exports = router;
