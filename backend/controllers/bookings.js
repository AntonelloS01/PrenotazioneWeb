const { validationResult } = require('express-validator');

const Booking = require('../models/booking');

exports.fetchAll = async (req, res, next) => {
  try {
    const userId = req.userId; 
    const [userBookings] = await Booking.fetchAll(userId);
    res.status(200).json(userBookings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.postBooking= async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const date = req.body.date;
  const number = req.body.number;
  const time = req.body.time;
  const user = req.body.user;

  try {
    const booking = {
      date: date,
      number: number,
      time: time,
      user: user,
    };
    const result = await Booking.save(booking);
    res.status(201).json({ message: 'booking!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const deleteResponse = await Booking.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
