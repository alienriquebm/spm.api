const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('../common/Validator');
const User = require('../models/User');

const login = async (req, res) => {

  // Get the params of the body
  const body = req.only('email', 'password');

  // Sets the rules and messages for validation
  const rules = {
    rules: {
      email: 'required|email',
      password: 'required',
    },
    messages: {},
  };

  // Check if the params sending are correct
  const isValid = await Validator.doValidation(body, rules);
  if (isValid !== true) {
    // There is a error validation, return the errors to validate on a form
    return res.formValidationError(isValid);
  }

  // Find the user
  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });

  // If no user found, throws error
  if (!user) {
    return res.error('Usuario o contraseña incorrecta', 404);
  }

  // If the user is inactive, throws error
  if (!user.isEnabled) { res.error('Usuario inactivo', 403); }

  // Check if the passwords match
  const passwordMatch = await bcrypt.compare(body.password, user.password);

  // If passwords doesn't match, throws error
  if (!passwordMatch) {
    return res.error('Usuario o contraseña incorrecta', 404);
  }

  // Generate the token
  const token = jwt.sign({ user: user.id, type: 'admin' }, process.env.APP_SECRET, { expiresIn: '12h' });

  // Return the token
  return res.json({ user: `${user.name} ${user.lastname}`, email: user.email, token });
};

router.post('/login', login);

module.exports = router;
