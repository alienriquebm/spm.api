const express = require('express');
const Group = require('../models/Group');
const Validator = require('../common/Validator');
// const DeleteHelper = require('../common/DeleteHelper');

const router = express.Router();

/* const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const instance = await DeleteHelper.tryToDelete(id, 'groups', null, res);
  res.json(instance);
};

router.delete('/:id(\\d+)', deleteGroup); */

const inactivateGroup = async (req, res) => {
  const { id } = req.params;
  const rules = {
    rules: {
      id: 'exists:groups,id',
    },
  };

  const isValid = await Validator.doValidation({ id }, rules);
  if (isValid !== true) {
    return res.formValidationError(isValid);
  }

  const isGroupEnabled = await Group.isGroupEnabled(id);
  if (!isGroupEnabled) {
    return res.error('El grupo no está habilitado');
  }

  Group.update({ isEnabled: false }, { where: { id } });
  return res.json({ id });
};

router.delete('/:id(\\d+)', inactivateGroup);
module.exports = router;
