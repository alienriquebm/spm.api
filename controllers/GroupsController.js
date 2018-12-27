const express = require('express');
const DeleteHelper = require('../common/DeleteHelper');

const router = express.Router();

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const instance = await DeleteHelper.tryToDelete(id, 'groups', null, res);
  res.json(instance);
};

router.delete('/:id(\\d+)', deleteGroup);
module.exports = router;
