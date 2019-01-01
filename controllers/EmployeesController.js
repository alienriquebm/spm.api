const express = require('express');
const bcrypt = require('bcrypt');
const Validator = require('../common/Validator');
const User = require('../models/User');
const Employee = require('../models/Employee');
const EmployeeGroup = require('../models/EmployeeGroup');
const Group = require('../models/Group');
const DeleteHelper = require('../common/DeleteHelper');

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

const assignEmployeeGroup = async (req, res) => {
  const body = req.only('employeeId', 'groupId');
  const rules = {
    rules: {
      employeeId: 'required|exists:employees,id',
      groupId: 'required|exists:groups,id',
    },
  };

  const isValid = await Validator.doValidation(body, rules);
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
  const isValid = await Validator.doValidation(body, rules);
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
router.post('/create', createEmployee);
router.post('/assign-group', assignEmployeeGroup);
router.delete('/unassign-group', unassignEmployeeGroup);

module.exports = router;
