const db = require('../util/database');

module.exports = class Booking {
  constructor(date, number, user) {
    this.date = date;
    this.number = number;
    this.user = user;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM bookings');
  }

  static save(booking) {
    return db.execute(
      'INSERT INTO bookings (date, number, user) VALUES (?, ?, ?)',
      [booking.date, booking.number , booking.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM bookings WHERE id = ?', [id]);
  }
};
