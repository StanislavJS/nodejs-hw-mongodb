**hw4-validation**

---

# Node.js HW4 – Contacts API

This project is the fourth homework for the Node.js course. It extends the previous CRUD app for managing contacts by adding **validation, pagination, sorting, and filtering**.

## Features

- CRUD operations for contacts
- Input validation for `POST` and `PATCH` requests
- Pagination for `GET /contacts`
- Sorting by name
- Optional filtering by `contactType` and `isFavourite`
- Proper error handling with HTTP status codes
- MongoDB as the database

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- http-errors
- Pino logger
- Nodemon (for development)
- REST Client for testing API requests

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/StanislavJS/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file based on `.env.example`:

```
PORT=3000
MONGODB_URL=your_mongodb_connection_string
```

4. Run the development server:

```bash
npm run dev
```

Server will start on `http://localhost:3000`.

---

## API Endpoints

### Get All Contacts

```
GET /contacts
```

**Query Parameters:**

| Parameter   | Description                                | Default |
| ----------- | ------------------------------------------ | ------- |
| page        | Page number                                | 1       |
| perPage     | Number of items per page                   | 10      |
| sortBy      | Field to sort by (e.g., `name`)            | -       |
| sortOrder   | Sorting order: `asc` or `desc`             | asc     |
| type        | Filter by contact type (optional)          | -       |
| isFavourite | Filter favourite contacts (`true`/`false`) | -       |

**Response Example:**

```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": {
    "data": [
      {
        "_id": "68b889cd99d083f76299ca4f",
        "name": "Alice",
        "phoneNumber": "123456789",
        "contactType": "home",
        "isFavourite": true
      }
    ],
    "page": 1,
    "perPage": 10,
    "totalItems": 25,
    "totalPages": 3,
    "hasPreviousPage": false,
    "hasNextPage": true
  }
}
```

---

### Get Contact by ID

```
GET /contacts/:id
```

**Response Example:**

```json
{
  "_id": "68b889cd99d083f76299ca4f",
  "name": "Alice",
  "phoneNumber": "123456789",
  "contactType": "home",
  "isFavourite": true
}
```

---

### Create a Contact

```
POST /contacts
```

**Body Example:**

```json
{
  "name": "Bob",
  "phoneNumber": "987654321",
  "contactType": "work",
  "isFavourite": false
}
```

**Response:**

```json
{
  "_id": "new_id_here",
  "name": "Bob",
  "phoneNumber": "987654321",
  "contactType": "work",
  "isFavourite": false
}
```

---

### Update a Contact

```
PATCH /contacts/:id
```

**Body Example:**

```json
{
  "name": "Bob Smith",
  "isFavourite": true
}
```

**Response Example:**

```json
{
  "_id": "68b889cd99d083f76299ca4f",
  "name": "Bob Smith",
  "phoneNumber": "987654321",
  "contactType": "work",
  "isFavourite": true
}
```

---

### Delete a Contact

```
DELETE /contacts/:id
```

**Response:** Status `204 No Content` if successful.

---

## Notes

- All requests and responses are in JSON format.
- Input validation ensures all required fields are provided and string fields have length between **3 and 20 characters**.
- Invalid IDs will return **400 Bad Request**.
- Non-existing resources will return **404 Not Found**.
- Pagination and sorting allow flexible API usage for large collections.

---

## Deployment

The app is deployed on **render.com** from branch `hw4-validation`.
Make sure environment variables (`PORT`, `MONGODB_URL`) are set correctly.

---

## Author

Stanislav Tatarchuk – Vilnius, Lithuania
GitHub: [https://github.com/StanislavJS](https://github.com/StanislavJS)
Email: [stasyk55@gmail.com](mailto:stasyk55@gmail.com)

---
