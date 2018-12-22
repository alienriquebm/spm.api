const express = require('express');

const router = express.Router();

router.use('/auth', require('../controllers/AuthController'));
router.use('/observations', require('../controllers/ObservationsController'));
router.use('/users', require('../controllers/UsersController'));

router.get('/', (_, res) => {
  res.json({
    api_status: 'up',
  });
});

// In case of not match any route
router.get('*', (req, res) => {
  res.status(400).json({ error: 'RECURSO NO ENCONTRADO' });
});


// To intercept errors
router.use((err, req, res, next) => { // eslint-disable-line
  res.internalError(err);
});

module.exports = router;
