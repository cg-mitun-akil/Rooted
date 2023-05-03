const express = require('express');
const mysql = require('mysql');
const { getConnection } = require('../databaseConfig');

const reviewRouter = express.Router();

reviewRouter.get('/:eventid', (req, res) => {
  const eventid = req.params.eventid;
  if(!eventid) {
    return res.status(400).json({ error: 'Event ID missing.' });
  }
  getConnection().query(`SELECT * FROM Review WHERE eventid = ${mysql.escape(eventid)};`,
   (err, result) => {
    if (err) return res.status(400).json(err);
    if(result === undefined)
    {
      return res.status(400).json({error: 'Couldn\'t fetch reviews'});
    }
    res.json({reviews: result});
   })
  });

reviewRouter.post('/', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, stars, comment } = req.body;
  if(!eventid || !stars)
  {
    return res.status(400).json({ error: 'Review data missing.' });
  }

  // Check if the user has already made a review for this event
  getConnection().query(`SELECT * FROM Review WHERE username = ${mysql.escape(username)} 
    AND eventid = ${mysql.escape(eventid)};`, (error, results) => {
    if (error) return res.status(400).json(error);

    if (results.length > 0) {
      getConnection().query('UPDATE Review SET stars = ?, comment = ? WHERE eventid = ? AND username = ?;',
        [stars, comment, eventid, username], (err, result) => {
        if (err) return res.status(400).json(err);

        res.status(201).send('Review updated successfully!');
      });
    } else {
      // Insert the review
      const review = { username, eventid, stars, comment };
      getConnection().query('INSERT INTO Review SET ?;', review, (err, result) => {
        if (err) return res.status(400).json(err);

        res.status(201).send('Review added successfully!');
      });
    }
  });
});

reviewRouter.post('/del', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid } = req.body;

  // Check if the user is deleting their own review
  getConnection().query(`SELECT * FROM Review WHERE username = ${mysql.escape(username)} 
    AND eventid = ${mysql.escape(eventid)};`, (error, results) => {
    if (error) return res.status(400).json(error);

    if (results.length === 0) {
      res.status(404).send('Review not found');
    } else if (results[0].username !== username) {
      res.status(403).send('You can only delete your own reviews');
    } else {
      // Delete the review
      getConnection().query(`DELETE FROM Review WHERE username = ${mysql.escape(username)} 
        AND eventid = ${mysql.escape(eventid)};`, (err, result) => {
        if (err) return res.status(400).json(err);

        res.status(204).send('Review deleted successfully!');
      });
    }
  });
});

module.exports = reviewRouter;