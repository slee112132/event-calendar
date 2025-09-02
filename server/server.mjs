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


// Connect to MongoDB
const client = new MongoClient('mongodb://localhost:27017');
const conn = await client.connect();
const db = conn.db('app');

// events REST API
const eventsCollection = db.collection('events');

/*
GET
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
FIND ONE
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
DELETE
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
INSERT
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
REPLACE
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
PATCH
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
INCREMENT 1
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
DECREMENT 1
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
