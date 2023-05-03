const express = require('express');
const { getConnection } = require('../databaseConfig');

const bookingRouter = express.Router();

bookingRouter.get('/:eventid', (req, res) => {
  getConnection().query('SELECT * FROM Booking WHERE eventid = ?;', [req.params.eventid], (error, results) => {
    if (error) return res.status(400).json(error);

    res.status(200).json({bookings: results});
  });
});

// Endpoint for adding a booking
bookingRouter.post('/', (req, res) => {
  if(!req.isAuthenticated)
  return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, dateBooked } = req.body;

  // Check if the event was created by the same user
  getConnection().query('SELECT * FROM Event WHERE eventid = ? AND userCreated = ?;', [eventid, username], (error, results) => {
    if (error) return res.status(400).json(error);

    if (results.length === 0) {
      return res.status(403).send('You can only book your own events');
    } else {
      // Check if the booking date is unique
      getConnection().query('SELECT * FROM Booking WHERE eventid = ? AND dateBooked = ?;', [eventid, dateBooked], (error, results) => {
        if (error) return res.status(400).json(error);

        if (results.length > 0) {
          return res.status(400).send('This date is already booked for this event');
        } else {
          // Insert the booking
          const booking = { eventid, dateBooked };
          getConnection().query('INSERT INTO Booking SET ?', booking, (err, result) => {
            if (err) return res.status(400).json(err);

            res.status(201).send('Booking added successfully!');
          });
        }
      });
    }
  });
});

// Endpoint for deleting a booking by event
bookingRouter.post('/del', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, dateBooked } = req.body;

  // Check if the event was created by the same user
  getConnection().query('SELECT * FROM Event WHERE eventid = ? AND userCreated = ?;', [eventid, username], (error, results) => {
    if (error) return res.status(400).json(error);

    if (results.length === 0) {
      return res.status(403).send('You can only delete bookings for your own events');
    } else {
      // Delete the booking
      getConnection().query('DELETE FROM Booking WHERE eventid = ? AND dateBooked = ?;', [eventid, dateBooked], (err, result) => {
        if (err) return res.status(400).json(err);

        if (result.affectedRows === 0) {
          return res.status(404).send('Booking not found');
        } else {
          res.status(204).send('Booking deleted successfully');
        }
      });
    }
  });
});

module.exports = bookingRouter;