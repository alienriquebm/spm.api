const express = require('express');

const router = express.Router();
const Observation = require('../models/Observation');

const getAllObservations = async (_, res) => {
  const data = await Observation.findAll();
  res.json({
    observations: data,
  });
};

router.get('/', getAllObservations);

module.exports = router;
