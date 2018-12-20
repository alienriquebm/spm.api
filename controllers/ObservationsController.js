const express = require('express');

const router = express.Router();
const Observation = require('../models/Observation');

const getAllObservations = async (_, res) => {
  const data = await Observation.findAll();
  res.json({
    observations: data,
  });
};

const errorTest = (_, res) => {
  res.notFoundError('Recurso no encontrado');
};

router.get('/', getAllObservations);
router.get('/test', errorTest);

module.exports = router;
