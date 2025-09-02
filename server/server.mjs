import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

// log every request to the console
app.use((req, res, next) => {
  console.log('>', req.method, req.path);
  next();
});

// --- Change nothing above this line ---

// Delay every request by a few seconds
app.use((req, res, next) => {
  const delay = Math.floor(Math.random() * 4) * 1000;
  setTimeout(() => {
      next();
  }, delay);
});

// Connect to MongoDB
const client = new MongoClient('mongodb://localhost:27017');
const conn = await client.connect();
const db = conn.db('app');

// events REST API
const eventsCollection = db.collection('events');

/*
This GET endpoint retrieves all events from the collection, optionally filtered by
a single category and/or text searched by `search` query parameter.
The query object is built up conditionally to include `$text` and `type` only
when those params are present. Returns status 200 with a JSON array of events.
Errors are passed to next() for centralized handling.
*/
app.get('/api/events', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    if (req.query.type) {
      query.type = req.query.type;
    }
    const allEvents = await eventsCollection.find(query).toArray();
    res.status(200).json(allEvents);
  } catch (err) {
    next(err);
  }
});

/*
This GET endpoint retrieves one event by its MongoDB ObjectId using findOne().
It correctly checks for missing documents and returns a 404 if not found, or 200 with JSON otherwise.
The ObjectId parsing and use of req.params follow class rules.
The error handling is properly given to to the Express error handling thru next(). Everything is logically correct so nothing was changed.
*/
app.get('/api/events/:id', async (req, res, next) => {
  try {
    const event = await eventsCollection.findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!event) {
      return res.sendStatus(404);
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
});

/*
This DELETE endpoint removes an event document using deleteOne() by ObjectId.
It returns 200 on success, 404 if no document was deleted, with no body as required.
The structure mirrors what was taught in class and includes clear control flow.
Error handling is passed to Express for any exceptions. Nothing changed.
*/
app.delete('/api/events/:id', async (req, res, next) => {
  try {
    const result = await eventsCollection.deleteOne({
      _id: new ObjectId(req.params.id)
    });
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

/*
This DELETE endpoint removes an event document using deleteOne() by ObjectId.
It returns 200 on success, 404 if no document was deleted, with no body as required.
The structure reflects what was taught in class and includes flow.
Error handling is passed to Express for any exceptions. Nothing changed.
*/
app.post('/api/events', async (req, res, next) => {
  try {
    const result = await eventsCollection.insertOne(req.body);
    const inserted = await eventsCollection.findOne({ _id: result.insertedId });
    res.status(201).json(inserted);
  } catch (err) {
    next(err);
  }
});

/*
  PUT /api/events/:id
  Replaces an event using replaceOne().
  Deletes `_id` from the request body before replacement as required.
  Returns 200 with the updated document or 404 if not found. Deleted .response.body from eventId.response.body._id, this is something that AI kept giving me for test.http, which wouldn't work anyway, but was weird that it gave it to me here. I omitted it so that the code would function correctly.
*/
app.put('/api/events/:id', async (req, res) => {
    const eventId = req.params.id;
    const eventData = req.body;
    delete eventData._id;
    const result = await eventsCollection.replaceOne(
      { _id: new ObjectId(eventId) },
      eventData
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const replacedEvent = await eventsCollection.findOne({ _id: new ObjectId(eventId)});
    return res.status(200).json({ message: 'Event replaced successfully', event: replacedEvent});
});


/*
This PATCH endpoint modifies specific fields of an event using $set and updateOne().
It only updates the fields provided in the request body, leaving other fields untouched.
The response is the full updated document, with 404 returned if no document is matched.
This matches our classroom implementation for partial updates, no changes needed.
*/
app.patch('/api/events/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = { $set: req.body };

    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      updateFields
    );

    if (result.matchedCount === 0) {
      return res.sendStatus(404);
    }

    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

/*
  Increments attendees by 1 using $inc.
  Returns 200 with updated document or 404 if event not found.
  Responds with updated document, functions correctly. Nothing changed.
*/
app.post('/api/events/:id/rsvp', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { numberOfAttendees: 1 } }
    );
    if (result.matchedCount === 0) {
      return res.sendStatus(404);
    }
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

/*
POST /api/events/:id/cancelRSVP
Decrements attendees by 1 using $inc.
Returns 200 with updated document or 404 if event not found.
Responds with updated document, functions correctly. Nothing changed.
*/
app.post('/api/events/:id/cancelRSVP', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { numberOfAttendees: -1 } }
    );
    if (result.matchedCount === 0) {
      return res.sendStatus(404);
    }
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// --- Change nothing below this line ---

// 404 - not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'resource ' + req.url + ' not found' });
});

// 500 - Any server error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send();
});

// start server on port
const server = app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/`);
});
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`error: port ${port} is already in use!`, 'kill this server! (control + c)');
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});
