`nodejs-hw-mongodb` project (HW3 – CRUD for Contacts):

---

# Node.js + MongoDB Contacts CRUD API

This project implements a **RESTful API** for managing contacts using **Node.js**, **Express**, and **MongoDB (Mongoose)**. It supports full CRUD operations with proper error handling.

---

## Features

* **Create, Read, Update, Delete (CRUD)** contacts
* RESTful API endpoints
* Input validation with proper error responses
* Centralized error handling and 404 handler
* Logging using **Pino**
* Fully tested via **VSCode REST Client** (`requests.http`)
* Modular project structure for maintainability

---

## Project Structure

```
nodejs-hw-mongodb/
├─ src/
│  ├─ controllers/contacts.mjs
│  ├─ middlewares/
│  │  ├─ errorHandler.mjs
│  │  └─ notFoundHandler.mjs
│  ├─ routers/contacts.mjs
│  ├─ services/contacts.mjs
│  ├─ utils/ctrlWrapper.mjs
│  ├─ index.mjs
│  └─ server.mjs
├─ requests.http
├─ package.json
├─ package-lock.json
└─ .env.example
```

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/StanislavJS/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file** based on `.env.example` and set your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/contactsdb
PORT=3000
```

---

## Usage

Start the server in development mode:

```bash
npm run dev
```

Server will run on **[http://localhost:3000](http://localhost:3000)**

---

## API Endpoints

| Method | URL             | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/contacts`     | Get all contacts       |
| GET    | `/contacts/:id` | Get a contact by ID    |
| POST   | `/contacts`     | Create a new contact   |
| PATCH  | `/contacts/:id` | Update a contact by ID |
| DELETE | `/contacts/:id` | Delete a contact by ID |

---

## Request Examples (REST Client)

**Get all contacts:**

```http
GET http://localhost:3000/contacts
Accept: application/json
```

**Get contact by ID:**

```http
GET http://localhost:3000/contacts/:id
Accept: application/json
```

**Create a contact:**

```http
POST http://localhost:3000/contacts
Content-Type: application/json

{
  "name": "Mango",
  "email": "mango@gmail.com",
  "phone": "123-45-67"
}
```

**Update a contact:**

```http
PATCH http://localhost:3000/contacts/:id
Content-Type: application/json

{
  "phone": "999-88-77"
}
```

**Delete a contact:**

```http
DELETE http://localhost:3000/contacts/:id
```

---

## Error Handling

* **400 Bad Request** – invalid or missing fields
* **404 Not Found** – contact not found
* **500 Internal Server Error** – server issues

---

## Logging

* HTTP requests are logged using **Pino**.
* Logs include: method, URL, status code, response time, and errors.

---

## Contributing

1. Fork the repository
2. Create a branch for your feature/fix
3. Commit changes
4. Push branch and create a pull request

---

## License

MIT License

---

