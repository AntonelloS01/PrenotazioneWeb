const db = require('../util/database');

module.exports = class Booking {
  constructor(date, number, time,user) {
    this.date = date;
    this.number = number;
    this.time= time;
    this.user = user;
  }


  static async userHasBooking(userId) {
    const [rows] = await db.execute(
      'SELECT id FROM bookings WHERE user = ?',
      [userId]
    );
    return rows.length > 0;
  }

  static fetchAll(userId) {
    return db.execute('SELECT * FROM bookings WHERE user = ?', [userId]);
  }

  static async save(booking) {
    const userAlreadyHasBooking = await this.userHasBooking(booking.user);
    if (userAlreadyHasBooking) {
      throw new Error("L'utente ha già una prenotazione attiva.");
    }

    return db.execute(
      'INSERT INTO bookings (date, number, time, user) VALUES (?, ?, ?, ?)',
      [booking.date, booking.number , booking.time, booking.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM bookings WHERE id = ?', [id]);
  }
};

