const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { getConnection } = require('../databaseConfig');
const mysql = require('mysql');

const picvidRouter = express.Router();

picvidRouter.post('/pic', (req, res) => {

  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, publicUrl } = req.body;
  if(!eventid || !publicUrl)
  {
    return res.status(400).json({ error: 'No eventid or public url provided.' });
  }
  const eventSelectSql = `SELECT * FROM Event WHERE eventid = ${mysql.escape(eventid)};`

  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);
    let currentEvent;
    if(result !== undefined && result.length > 0)
    {
      currentEvent = result[0];
    }
    else
    {
      return res.status(404).json({ error: 'Event not found.' });
    }
    if(currentEvent.userCreated !== username)
    {
      return res.status(403).json({ error: 'User not permitted to add pictures to this event.' });
    }
    
    getConnection().query('INSERT INTO Picture VALUES (?, ?);', [eventid, publicUrl], (result, err) => {
      if(err)
        return res.json(err);
      res.status(201).send('Successfully uploaded picture.');
    });
  });
});

picvidRouter.delete('/pic', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, publicUrl } = req.body;
  if(!eventid || !publicUrl)
    return res.status(400).json({error: 'No event id provided, or no public url provided'});
  const eventSelectSql = `SELECT * FROM Event WHERE eventid = ${mysql.escape(eventid)};`

  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);
    let currentEvent;
    if(result !== undefined && result.length > 0)
    {
      currentEvent = result[0];
    }
    else
    {
      return res.status(404).json({ error: 'Event not found.' });
    }
    if(currentEvent.userCreated !== username)
    {
      return res.status(403).json({ error: 'User not permitted to delete pictures from this event.' });
    }
   
    getConnection().query('DELETE FROM Picture WHERE eventid = ? AND url = ?;', [eventid, publicUrl], (result, err) => {
      if(err)
        return res.json(err);
      res.status(203).send('Successfully deleted picture.');
    });
  });
});

picvidRouter.post('/vid', (req, res) => {

  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, publicUrl } = req.body;
  if(!eventid || !publicUrl)
  {
    return res.status(400).json({ error: 'No eventid or public url provided.' });
  }
  const eventSelectSql = `SELECT * FROM Event WHERE eventid = ${mysql.escape(eventid)};`

  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);
    let currentEvent;
    if(result !== undefined && result.length > 0)
    {
      currentEvent = result[0];
    }
    else
    {
      return res.status(404).json({ error: 'Event not found.' });
    }
    if(currentEvent.userCreated !== username)
    {
      return res.status(403).json({ error: 'User not permitted to add videos to this event.' });
    }
    
    getConnection().query('INSERT INTO Video VALUES (?, ?);', [eventid, publicUrl], (result, err) => {
      if(err)
        return res.json(err);
      res.status(201).send('Successfully uploaded video.');
    });
  });
});

picvidRouter.delete('/vid', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid, publicUrl } = req.body;
  if(!eventid || !publicUrl)
    return res.status(400).json({error: 'No event id provided, or no public url provided'});
  const eventSelectSql = `SELECT * FROM Event WHERE eventid = ${mysql.escape(eventid)};`

  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);
    let currentEvent;
    if(result !== undefined && result.length > 0)
    {
      currentEvent = result[0];
    }
    else
    {
      return res.status(404).json({ error: 'Event not found.' });
    }
    if(currentEvent.userCreated !== username)
    {
      return res.status(403).json({ error: 'User not permitted to delete videos from this event.' });
    }
    
    getConnection().query('DELETE FROM Video WHERE eventid = ? AND url = ?;', [eventid, publicUrl], (result, err) => {
      if(err)
        return res.json(err);
      res.status(203).send('Successfully deleted video.');
    });
  })
});

module.exports = picvidRouter;