const express = require('express');

const router = express.Router();

router.use('/observations', require('../controllers/ObservationsController'));

router.get('/', (_, res) => {
  res.json({
    api_status: 'up',
  });
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.handleReject(err);
});

module.exports = router;
