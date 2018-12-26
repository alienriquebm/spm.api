const express = require('express');

const router = express.Router();
const validator = require('../common/Validator');
const EmployeeGroup = require('../models/EmployeeGroup');

const assignEmployeeGroup = async (req, res) => {
  const body = req.only('employeeId', 'groupId');
  const rules = {
    rules: {
      employeeId: 'required|exists:employees,id',
      groupId: 'required|exists:groups,id',
    },
  };

  const isValid = await validator.doValidation(body, rules);
  if (isValid !== true) {
    return res.formValidationError(isValid);
  }

  const employeeExistsOnGroup = await EmployeeGroup
    .isEmployeeInGroup(body.employeeId, body.groupId);
  if (employeeExistsOnGroup) {
    return res.error('El empleado existe en el grupo seleccionado');
  }
  const instance = await EmployeeGroup
    .create({ groupId: body.groupId, employeeId: body.employeeId });
  return res.json(instance);
};

router.post('/assign-group', assignEmployeeGroup);

module.exports = router;
