const express = require('express');

const router = express.Router();
const validator = require('../common/Validator');
const EmployeeGroup = require('../models/EmployeeGroup');
const Group = require('../models/Group');
const DeleteHelper = require('../common/DeleteHelper');

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

  const isGroupEnabled = await Group.isGroupEnabled(body.groupId);
  if (!isGroupEnabled) {
    return res.error('El grupo no está habilitado');
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

const getEmployeeGroups = async (req, res) => {
  const { id } = req.params;
  const instance = await EmployeeGroup.getEmployeeGroups(id);
  res.json({ groups: instance });
};

const unassignEmployeeGroup = async (req, res) => {
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
  const rowToDelete = await EmployeeGroup
    .findAll({
      where: {
        groupId: body.groupId,
        employeeId: body.employeeId,
      },
      attributes: ['id'],
    });
  if (!rowToDelete.length) {
    return res.notFoundError();
  }
  await DeleteHelper.tryToDelete(rowToDelete[0].id, 'employees__groups');
  return res.json(rowToDelete[0]);
};

router.get('/:id(\\d+)', getEmployeeGroups);
router.delete('/unassign-group', unassignEmployeeGroup);
router.post('/assign-group', assignEmployeeGroup);

module.exports = router;
