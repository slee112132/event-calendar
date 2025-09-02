# REST API Design for Events Collection

## AI Design Evaluation
The initial AI-generated design correctly employed pluralized URIs for collections, appropriate HTTP methods for each CRUD operation, and included filtering via a single `category` query parameter. It also specified the correct status codes (200, 201, 404) and laid out clear request and response formats. However, the AI draft omitted the 204 No Content response for successful DELETE operations and did not explicitly call out returning 204 when no body is needed; those have been corrected below.

---

## CRUD Endpoints

### 1. Retrieve All Events (Read Collection)

- **Description:**
  Returns all events, optionally filtered by one category.
- **HTTP Method:** GET
- **URI:** `/api/events`
- **Query Parameters:**
  - `category` (optional): string to filter events by that category
- **Request Body:** None
- **Response Status:** 200 OK
- **Response Body:**

  ```json

  [
    {
      "_id": "eventId1",
      "name": "Community Picnic",
      "date": "2023-07-04T12:00:00.000Z",
      "location": "Central Park",
      "description": "A gathering for community members to enjoy food, games, and conversation.",
      "numberOfAttendees": 75,
      "category": "Social"
    },
    {
      "_id": "eventId2",
      "name": "Neighborhood BBQ",
      "date": "2023-08-15T17:30:00.000Z",
      "location": "Local Park",
      "description": "An afternoon BBQ with neighbors and friends.",
      "numberOfAttendees": 90,
      "category": "Social"
    }
    ...
  ]


## 2. Retrieve a Single Event (Read Document)

- **Description:**
Returns one event by its ID.

- **HTTP Method:** GET

- **URI:** /api/events/:id

- **Query Parameters:** None

- **Request Body:** None

- **Response Status:**
200 OK if found
404 Not Found if no matching ID
**Response Body:**

```json
[
  {
    "_id": "eventId1",
    "name": "Community Picnic",
    "date": "2023-07-04T12:00:00.000Z",
    "location": "Central Park",
    "description": "A gathering for community members to enjoy food, games, and conversation.",
    "numberOfAttendees": 75,
    "category": "Social"
  }
]

```

## 3. Delete an Event (Delete Document)

- **Description:**
Removes one event by its ID.

- **HTTP Method:** DELETE

- **URI:** /api/events/:id

- **Query Parameters:** None

- **Request Body:** None

- **Response Status:**
204 No Content if deletion succeeds
404 Not Found if no matching ID
- **Response Body:** None

## 4. Create an Event (Create Operation)

- **Description:**
Adds a new event using the provided JSON.

- **HTTP Method:** POST

**URI:** /api/events

**Query Parameters:** None

**Request Body:**

```json
{
  "name": "Sample Event",
  "date": "2023-03-26T12:00:00Z",
  "location": "Sample Location",
  "description": "Sample Description",
  "numberOfAttendees": 0,
  "category": "Social"
}

```

- **Response Status:** 201 Created

- **Response Body:**

```json
{
  "_id": "newEventId",
  "name": "Sample Event",
  "date": "2023-03-26T12:00:00Z",
  "location": "Sample Location",
  "description": "Sample Description",
  "numberOfAttendees": 0,
  "category": "Social"
}

```

## 5. Replace an Event (Update Operation: Replace)
**Description:**
Replaces an existing event (ignoring any _id in the request).

**HTTP Method:** PUT

**URI:** /api/events/:id

**Query Parameters:** None

**Request Body:**

```json

{
  "name": "Updated Event",
  "date": "2023-07-04T12:00:00Z",
  "location": "Updated Location",
  "description": "Updated description with additional details.",
  "numberOfAttendees": 80,
  "category": "Social"
}
```

**Response Status:**
200 OK if replacement succeeds
404 Not Found if no matching ID
**Response Body:**

```json

{
  "_id": "eventId1",
  "name": "Updated Event",
  "date": "2023-07-04T12:00:00Z",
  "location": "Updated Location",
  "description": "Updated description with additional details.",
  "numberOfAttendees": 80,
  "category": "Social"
}

```

## 6. Modify an Event (Update Operation: Modify)
**Description:**
Updates only specified fields of an existing event.

**HTTP Method:** PATCH

**URI:** /api/events/:id

**Query Parameters:** None

**Request Body:**

```json

{
  "name": "Modified Event Name"
}

```

**Response Status:**
200 OK if update succeeds
404 Not Found if no matching ID

**Response Body:**

```json

{
  "_id": "eventId1",
  "name": "Modified Event Name",
  "date": "2023-07-04T12:00:00Z",
  "location": "Central Park",
  "description": "A gathering for community members to enjoy food, games, and conversation.",
  "numberOfAttendees": 75,
  "category": "Social"
}

```

## 7. RSVP to an Event
**Description:**
Increments numberOfAttendees by 1 for the given event.

**HTTP Method:** POST

**URI:** /api/events/:id/rsvp

**Query Parameters:** None

**Request Body:** None

**Response Status:**
200 OK if operation succeeds
404 Not Found if no matching ID

**Response Body:**

```json

{
  "_id": "eventId1",
  "name": "Community Picnic",
  "date": "2023-07-04T12:00:00Z",
  "location": "Central Park",
  "description": "A gathering for community members to enjoy food, games, and conversation.",
  "numberOfAttendees": 76,
  "category": "Social"
}

```

## 8. Cancel RSVP
**Description:**
Decrements numberOfAttendees by 1 for the given event.

**HTTP Method:** POST

**URI:** /api/events/:id/cancelRSVP

**Query Parameters:** None

**Request Body:** None

**Response Status:**
200 OK if operation succeeds
404 Not Found if no matching ID

**Response Body:**

```json
{
  "_id": "eventId1",
  "name": "Community Picnic",
  "date": "2023-07-04T12:00:00Z",
  "location": "Central Park",
  "description": "A gathering for community members to enjoy food, games, and conversation.",
  "numberOfAttendees": 74,
  "category": "Social"
}
```
