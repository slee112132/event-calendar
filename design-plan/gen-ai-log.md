# Generate AI Usage Log

As required in the syllabus, log all generative AI usage in this file for this assignment.

# gen-ai-log.md

# P2Final

I used AI to explain mongo $text and how it doesn't search substrings, only full words.


# P2M3

I used AI to generate the 20 images that are displayed on the website. My specific prompt was "Please generate an image for the following event:", and then I copy and pasted relevant details from that speific event. It did a great job, as the images were detailed, high-quality, and relevant to the event it was describing.

I also used Co-pilot to explain to me the map function, as I was still unclear. It gave a detailed description as well as an example, improving my understanding of it and allowing me to implement it in my code.

## AI PROMPTS AND EVALUATIONS

## GET /api/events (Read Collection)
**Prompt:**
Write an Express.js route that retrieves all documents from a MongoDB collection called "events". If a query parameter called "category" is provided, filter the results by that category.

**AI Response:**

```js

app.get('/api/events', async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await eventsCollection.find(filter).toArray();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
});

```

 The AI correctly conditionally applied a filter based on the query and returned a 200 status with the events array. This matches how we handled conditional filters in class. I accepted the code with no changes.

## GET /api/events/:id (Read Document)

Prompt: Write an express.js get route that retrieves a singular mongodb document by its objectID, using findOne().

**AI Response:**

```js
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
```

The logic was complete and correctly returned 404 when no event was found. I added curly braces to the if statement for style consistency, but otherwise left the logic unchanged.

## DELETE /api/events/:id

Prompt: Create a DELETE route using Express that deletes a document by _id from a MongoDB collection and returns 404 if no document was deleted.

AI Response:

```js

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

```

Evaluation: The AI properly used deleteOne() and returned the correct status codes. I added curly braces around the if statement, and this one I had to prompt it a lot of different ways as I wasn't getting the result I needed with the tests, but otherwise the final implementation is valid and aligns with class practices.

## POST /api/events (Create)
Prompt: Write a POST route in Express that inserts a new document into a MongoDB collection and returns the inserted document using the insertedId.

AI Response:

``` js

app.post('/api/events', async (req, res, next) => {
  try {
    const result = await eventsCollection.insertOne(req.body);
    const inserted = await eventsCollection.findOne({ _id: result.insertedId });
    res.status(201).json(inserted);
  } catch (err) {
    next(err);
  }
});

```

Evaluation: The response matched class instruction exactly. The AI correctly retrieved the inserted document using insertedId. No changes were needed, this one looked very similar to what I've seen in class materials before.

PUT /api/events/:id (Replace)
Prompt: Write a PUT route in Express that fully replaces a MongoDB document using replaceOne(). Be sure to delete _id from the request body using JavaScript’s delete keyword before replacing.

AI Response:

```js

app.put('/api/events/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    delete body._id;
    const result = await eventsCollection.replaceOne({ _id: new ObjectId(id) }, body);
    if (result.matchedCount === 0) return res.sendStatus(404);
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

```

Evaluation: This implementation correctly uses replaceOne() and deletes _id from the request body, as required. I feel as if static codes are correct, but no matter how I prompted the AI, or no matter how I changed this individually or in office hours, I was unable to get it to actually replace (delete the original),

## PATCH /api/events/:id (Modify)
Prompt: Write an Express PATCH route that updates specific fields of a MongoDB document using $set with updateOne().

AI Response:

```js

app.patch('/api/events/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = { $set: req.body };
    const result = await eventsCollection.updateOne({ _id: new ObjectId(id) }, updateFields);
    if (result.matchedCount === 0) return res.sendStatus(404);
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

```

Evaluation: This correctly uses $set with updateOne() to modify only the provided fields. It checks matchedCount to return 404 if no document matched. The try/catch and next(err) pattern matches class conventions. I kept the implementation mostly unchanged. I don't think we've covered $set but I read the documentation and had it covered in office hours, so I feel well prepared to use it within this assignment.

## POST /api/events/:id/rsvp (Action Endpoint)
Prompt: Create a POST route in Express that increments the attendees field of a MongoDB event document by 1 using $inc.
AI Response:

```js

app.post('/api/events/:id/rsvp', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { attendees: 1 } }
    );
    if (result.matchedCount === 0) return res.sendStatus(404);
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});


```

Evaluation: The $inc operation was correctly used to increment the attendees field. The code handled 404s and returned the updated document. No changes were needed.

## POST /api/events/:id/cancelRSVP (Action Endpoint)
Prompt: Write an Express POST route that decrements the attendees field by 1 for a MongoDB document using $inc.

AI Response:

```js

app.post('/api/events/:id/cancelRSVP', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { attendees: -1 } }
    );
    if (result.matchedCount === 0) return res.sendStatus(404);
    const updated = await eventsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});


```


First Prompt: Design two Express.js GET endpoints for a RESTful API using MongoDB. One endpoint should return all documents from a collection with optional filtering by a "category" query parameter. The other should retrieve a single document by ObjectId.

First AI Response:

```js

// GET all events with optional category filter
app.get('/api/events', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const events = await eventsCollection.find(filter).toArray();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET one event by ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await eventsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format or server error' });
  }
});

```

Second prompt: Added "Use async/await and handle errors properly, as well as try/catch".
Second/correct AI Response:

```js

app.get('/api/events', async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const events = await collection.find(filter).toArray();
  res.json(events);
});

app.get('/api/events/:id', async (req, res) => {
  const event = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (!event) return res.sendStatus(404);
  res.json(event);
});

```


Evaluation: The AI correctly used find() and toArray() for reading all events, and findOne() with ObjectId for a specific event. Error handling was minimal and no try/catch blocks were included. I fixed this by adding full error handling using next() and ensured that status codes (200, 404) were returned. I also renamed the collection to eventsCollection as per my project structure.
