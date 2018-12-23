const express = require('express');
const bcrypt = require('bcrypt');
const Validator = require('../common/Validator');
const User = require('../models/User');
const Employee = require('../models/Employee');

const router = express.Router();

const createEmployee = async (req, res) => {
  const body = req.only('email', 'name', 'lastname', 'phone', 'address', 'isEnabled', 'password', 'position');

  const rules = {
    rules: {
      email: 'required|email',
      name: 'required',
      lastname: 'required',
      isEnabled: 'required',
      password: 'required|min:6',
      position: 'required',
    },
    messages: {
      'min.password': 'La contraseña debe tener al menos 6 caracteres',
    },
  };

  const isValid = await Validator.doValidation(body, rules);
  if (isValid !== true) {
    return res.formValidationError(isValid);
  }

  body.password = await bcrypt.hash(body.password, 10);
  const user = await User.create(body);
  const employee = await Employee.create({ userId: user.id, position: body.position });

  const plainEmployeeData = {
    id: employee.id,
    name: user.name,
    lastname: user.lastname,
    isEnabled: user.isEnabled,
    position: employee.position,
  };

  return res.json(plainEmployeeData);
};

router.post('/create', createEmployee);

module.exports = router;
