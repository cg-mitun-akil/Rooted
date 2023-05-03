const express = require('express');
const mysql = require('mysql');
const { getConnection } = require('../databaseConfig');

const eventRouter = express.Router();

//format for the api endpoint
// /api/v1/event/multiple?eventType=eventtypehere&ratingMin=ratingMinHere&ratingMax=ratingMaxHere&nativeLocation=nativeLocationHere&nativeLanguage=nativeLanguageHere
//you can leave out some of the query parameters if  necessary. to call without any query parameters
// /api/v1/event/multiple OR /api/v1/event/multiple?

eventRouter.get('/multiple/', (req, res) => {

  let eventSelectSql = `
    SELECT e.eventid, e.title, e.eventType, e.rating, e.description, e.nativeLanguage, GROUP_CONCAT(p.url) AS pictures
    FROM Event e
    LEFT JOIN Picture p ON e.eventid = p.eventid`;
  let queryLength = Object.keys(req.query).length;
  if(queryLength > 0)
  {
    eventSelectSql += ` WHERE`;
  }
  if(req.query.eventType)
  {
    eventSelectSql += ` e.eventType = ${mysql.escape(req.query.eventType)}`;
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.ratingMin)
  {
    eventSelectSql += ` e.rating >= ${mysql.escape(Number(req.query.ratingMin))}`;
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.ratingMax)
  {
    eventSelectSql += ` e.rating <= ${mysql.escape(Number(req.query.ratingMax))}`;
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.nativeLocation)
  {
    eventSelectSql += ` e.nativeLocation <= ${mysql.escape(req.query.nativeLocation)}`;
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.nativeLanguage)
  {
    eventSelectSql += ` e.nativeLanguage <= ${mysql.escape(req.query.nativeLanguage)}`;
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.searchTerm)
  {
    eventSelectSql += `( e.title LIKE ${mysql.escape('%'+req.query.searchTerm+'%')} OR e.description LIKE ${mysql.escape('%'+req.query.searchTerm+'%')} ) `; 
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  if(req.query.username)
  {
    eventSelectSql += ` e.userCreated = ${mysql.escape(req.query.username)}`; 
    queryLength --;
    if(queryLength > 0)
      eventSelectSql += ` AND`;
  }
  eventSelectSql +=  ` GROUP BY e.eventid;`;
  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);;
    let allEvents;
    if(result !== undefined)
    {
      allEvents = result;
    }
    else
    {
      return res.status(400).json({error: 'Couldn\'t fetch events'});
    }
    const events = allEvents.map((event) => {
      return {...event, pictures: event.pictures?.split(',')};
    });
    res.json({events: events});
  });
});

eventRouter.get('/single/:eventid', (req, res) => {
  const eventid = Number(req.params.eventid);
  if(!eventid || eventid === NaN) {
    return res.status(400).json({ error: 'Event ID missing.' });
  }
  const eventSelectSql = `
  SELECT e.*, GROUP_CONCAT(DISTINCT p.url) AS pictures, GROUP_CONCAT(DISTINCT v.url) AS videos
  FROM Event e
  LEFT JOIN Picture p ON e.eventid = p.eventid
  LEFT JOIN Video v ON e.eventid = v.eventid
  WHERE e.eventid = ${mysql.escape(eventid)};`
  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);;
    let allEvents;
    if(result !== undefined && result.length > 0)
    {
      allEvents = result;
    }
    else
    {
      return res.status(400).json({error: 'Couldn\'t fetch event'});
    }
    const event = allEvents[0];
    if(event.eventid !== eventid)
      return res.status(400).json({error: 'Couldn\'t fetch event'});
    event.pictures = event.pictures?.split(',');
    event.videos = event.videos?.split(',');
    res.json(event);
  });
});

eventRouter.post('/', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  if(!req.body.newEvent)
    return res.status(400).json({ error: 'Event details not available.' });
  const { title, eventType, nativeLocation, nativeLanguage, 
    description, contactNumber, contactCountryCode, contactEmail } = req.body.newEvent;
  if(!title || !eventType || !contactNumber || !contactEmail)
  {
    return res.status(400).json({ error: 'Some event details not available.' });
  }

  const eventInputSql = `INSERT INTO Event (userCreated, title, eventType, nativeLocation, nativeLanguage, 
    description, contactNumber, contactCountryCode, contactEmail)
        VALUES (${mysql.escape(username)}, ${mysql.escape(title)}, ${mysql.escape(eventType)}, ${mysql.escape(nativeLocation)}, 
        ${mysql.escape(nativeLanguage)}, ${mysql.escape(description)}, ${mysql.escape(contactNumber)},
        ${mysql.escape(contactCountryCode)}, ${mysql.escape(contactEmail)});`;
    getConnection().query(eventInputSql, function (err, result) {
      if (err) return res.status(400).json(err);
      console.log("1 event inserted");
      return res.status(201).json({...req.body.newEvent, eventid: result.insertId, userCreated: username});
    });
});

eventRouter.patch('/', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  console.log(req.body);
  if(!req.body.newEvent)
    return res.status(400).json({ error: 'Event details not available.' });
  const { eventid, title, eventType, nativeLocation, nativeLanguage, 
    description, contactNumber, contactCountryCode, contactEmail } = req.body.newEvent;
  if(!title || !eventType || !contactNumber || !contactEmail || !eventid)
  {
    return res.status(400).json({ error: 'Some event details not available.' });
  }
  // if(userCreated !== username)
  // {
  //   return res.status(403).json({ error: 'User not permitted to edit this event.' });
  // }
  const eventSelectSql = `SELECT * FROM Event WHERE eventid = ${mysql.escape(eventid)};`
  getConnection().query(eventSelectSql, (err, result) => {
    if (err) return res.status(400).json(err);;
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
      return res.status(403).json({ error: 'User not permitted to edit this event.' });
    }

    const eventUpdateSql = `UPDATE Event SET 
    title = ${mysql.escape(title)}, 
    eventType = ${mysql.escape(eventType)},
    nativeLocation = ${mysql.escape(nativeLocation)},
    nativeLanguage = ${mysql.escape(nativeLanguage)},
    description = ${mysql.escape(description)},
    contactNumber = ${mysql.escape(contactNumber)},
    contactCountryCode = ${mysql.escape(contactCountryCode)},
    contactEmail = ${mysql.escape(contactEmail)}
    WHERE eventid = ${mysql.escape(eventid)};
      `;
      getConnection().query(eventUpdateSql, function (err, result) {
        if (err) return res.status(400).json(err);;
        console.log("1 event updated");
        return req.body.newEvent;
      });
  });
});

eventRouter.delete('/', (req, res) => {
  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid } = req.body;
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
      return res.status(403).json({ error: 'User not permitted to delete this event.' });
    }

    const eventUpdateSql = `DELETE FROM Event WHERE eventid = ${mysql.escape(eventid)};
      `;
      getConnection().query(eventUpdateSql, function (err, result) {
        if (err) return res.status(400).json(err);
        console.log("1 event deleted");
        res.status(204).send('Event successfully deleted');
      });
  });
});

module.exports = eventRouter;