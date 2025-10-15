## 🧾 README for HW7-Swagger

# HW7: Swagger API Documentation

This project implements a RESTful API for managing contacts with authentication and Swagger documentation.

## 🚀 Features

- **User Authentication** (Register, Login with JWT tokens)
- **Contacts CRUD operations**
- **MongoDB integration**
- **Swagger UI** available at `/api-docs`
- **Secure routes** using Bearer tokens
- **Email notifications via Brevo (SMTP)**
- **Image uploads via Cloudinary**
- **Environment variables support**

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Swagger (OpenAPI 3.0)**
- **Pino** for logging
- **Brevo (Sendinblue)** for email sending
- **Cloudinary** for image storage

---

## 📁 Project structure

```

src/
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── validators/
├── docs/
│   ├── openapi.yaml
│   ├── swagger.json
│   └── swagger/
└── index.mjs

```

---

## ⚙️ Environment variables (.env)

```

# Server

PORT=3000

# MongoDB

MONGODB_USER=yourUser
MONGODB_PASSWORD=yourPassword
MONGODB_URL=yourClusterURL
MONGODB_DB=contactsdb

# JWT secret

JWT_SECRET=yourJWTsecret

# Application domain

APP_DOMAIN=[https://your-app-name.onrender.com/auth](https://your-app-name.onrender.com/auth)

# SMTP (Brevo)

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_login
SMTP_PASSWORD=your_brevo_smtp_key
SMTP_FROM=your_brevo_email

# Cloudinary

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret

```

---

## 🧰 Available Scripts

### Start in development mode

```bash
npm run dev
```

### Build Swagger docs

```bash
npm run build-docs
```

### Preview Swagger locally

```bash
npm run preview-docs
```

### Run production build

```bash
npm start
```

---

## 🧪 Endpoints Overview

| Method | Endpoint         | Description         | Auth Required |
| ------ | ---------------- | ------------------- | ------------- |
| POST   | `/auth/register` | Register new user   | ✅            |
| POST   | `/auth/login`    | Login and get token | ✅            |
| GET    | `/contacts`      | Get all contacts    | ✅            |
| POST   | `/contacts`      | Create contact      | ✅            |
| GET    | `/contacts/{id}` | Get contact by ID   | ✅            |
| PATCH  | `/contacts/{id}` | Update contact      | ✅            |
| DELETE | `/contacts/{id}` | Delete contact      | ✅            |

---

## 🧩 Swagger Documentation

After deployment, you can open your API documentation at:

```
https://your-app-name.onrender.com/api-docs
```

---

## ☁️ Deployment (Render)

### Steps:

1. Push your branch `hw7-swagger` to GitHub.
2. Create a new **Render Web Service**.
3. Connect your GitHub repo.
4. Select `main` branch.
5. Set **Build Command:**

   ```
   npm install && npm run build-docs
   ```

6. Set **Start Command:**

   ```
   npm start
   ```

7. Add **Environment Variables** (see list below).

---

## ✅ Status

- [x] Auth routes working
- [x] Contacts CRUD
- [x] JWT authorization
- [x] MongoDB connected
- [x] Swagger docs available
- [x] Ready for deployment

---

## 📄 License

MIT License © 2025 Stanislav Tatarchuk
