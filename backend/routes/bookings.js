const express = require('express');

const { body } = require('express-validator');

const bookingsController = require('../controllers/bookings');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, bookingsController.fetchAll);

router.post(
  '/',
  [
    
    auth,
    body('date').trim().isDate().not().isEmpty(),
    body('number').trim().isInt({ min: 1, max: 20 }).not().isEmpty(),
    body('time').trim().isString().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  
  bookingsController.postBooking
);

router.delete('/:id', auth, bookingsController.deleteBooking);

module.exports = router;