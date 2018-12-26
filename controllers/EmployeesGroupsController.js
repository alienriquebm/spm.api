const express = require('express');

const router = express.Router();
const validator = require('../common/Validator');
const EmployeeGroup = require('../models/EmployeeGroup');

const assignEmployeeGroup = async (req, res) => {
  const body = req.only('employeeId', 'groupId');
  const rules = {
    rules: {
      employeeId: 'required|exists:employees,id',
    },
  };

  const isValid = await validator.doValidation(body, rules);
  if (isValid !== true) {
    return res.formValidationError(isValid);
  }
  return res.json({ status: 'ok' });
};

router.post('/assign-group', assignEmployeeGroup);

module.exports = router;
