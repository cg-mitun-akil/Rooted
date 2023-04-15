const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { getConnection } = require('../databaseConfig');
const uuidv4 = require('uuid').v4;
const { Storage } = require('@google-cloud/storage');

const picvidRouter = express.Router();

picvidRouter.post('/pic', (req, res) => {
  const file = req.files.file;

  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  if(!(file.mimetype.startsWith('image/')))
  {
    res.status(400).send('File is not image.');
    return;
  }

  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid } = req.body;
  if(!eventid)
  {
    return res.status(400).json({ error: 'No eventid provided.' });
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

    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILENAME,
    });
    
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    const blob = bucket.file(uuidv4());

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error uploading file.');
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      getConnection().query('INSERT INTO Picture VALUES (?, ?);', [eventid, publicUrl], (result, err) => {
        if(err)
          return res.json(err);
        request.status(201).send('Successfully uploaded picture.');
      });
    });

    blobStream.end(file.data);
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
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILENAME,
    });
    
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    const fileName = publicUrl.split('/').pop();

    const file = bucket.file(fileName);

    file.delete().then(() => {
      getConnection().query('DELETE FROM Picture WHERE eventid = ? AND url = ?;', [eventid, publicUrl], (result, err) => {
        if(err)
          return res.json(err);
        request.status(203).send('Successfully deleted picture.');
      });
    }).catch((err) => {
      return res.status(400).json(err);
    });
  });
});

picvidRouter.post('/vid', (req, res) => {
  const file = req.files.file;

  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  if(!(file.mimetype.startsWith('video/')))
  {
    res.status(400).send('File is not video.');
    return;
  }

  if(!req.isAuthenticated)
    return res.status(401).json({ error: 'User not logged in.' });
  const username = req.user.username;
  const { eventid } = req.body;
  if(!eventid)
  {
    return res.status(400).json({ error: 'No eventid provided.' });
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

    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILENAME,
    });
    
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    const blob = bucket.file(uuidv4());

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error uploading file.');
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      getConnection().query('INSERT INTO Video VALUES (?, ?);', [eventid, publicUrl], (result, err) => {
        if(err)
          return res.json(err);
        request.status(201).send('Successfully uploaded video.');
      });
    });

    blobStream.end(file.data);
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
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILENAME,
    });
    
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    const fileName = publicUrl.split('/').pop();

    const file = bucket.file(fileName);

    file.delete().then(() => {
      getConnection().query('DELETE FROM Video WHERE eventid = ? AND url = ?;', [eventid, publicUrl], (result, err) => {
        if(err)
          return res.json(err);
        request.status(203).send('Successfully deleted video.');
      });
    }).catch((err) => {
      return res.status(400).json(err);
    });
  });
});

module.exports = picvidRouter;