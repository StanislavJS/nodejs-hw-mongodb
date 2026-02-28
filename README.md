# 📧 Node.js REST API — Contacts App (with Auth, Email Reset & Images)

## 🚀 Project Overview

This project is a **Node.js REST API** built with **Express**, **MongoDB**, and **JWT authentication**.
It supports:

- User registration and login
- JWT-based authentication
- Password reset via email
- Contact management (CRUD)
- Image upload with `multer`
- Deployment on **Render**

---

## 🧩 Features

### 🔐 Authentication

- User registration (`/auth/register`)
- User login (`/auth/login`)
- Token refresh (`/auth/refresh`)
- Logout (`/auth/logout`)

### 📩 Password Reset

- Request password reset (`/auth/send-reset-email`)
- Reset password with a valid token (`/auth/reset-password`)

### 👥 Contacts

- Get all contacts (`GET /contacts`)
- Get contact by ID (`GET /contacts/:id`)
- Create new contact (`POST /contacts`)
- Update contact (`PATCH /contacts/:id`)
- Delete contact (`DELETE /contacts/:id`)

### 🖼️ Image Upload

- Add or update a contact with an uploaded image using **multipart/form-data**

---

## ⚙️ Technologies Used

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Nodemailer** (email sending)
- **Multer** (file uploads)
- **Render** (deployment)

---

## 🧠 Password Reset Logic

1. **POST `/auth/send-reset-email`**
   - User sends their email.
   - API generates a **JWT token (valid for 5 minutes)**.
   - A reset link is generated:

     ```
     https://your-app.onrender.com/reset-password?token=...
     ```

   - If deployed on Render, email sending is **skipped** (Render blocks SMTP) —
     but the **reset link is returned in the response** for testing.

2. **PATCH `/auth/reset-password`**
   - User submits a new password and token.
   - Token is verified and the user’s password is updated.

---

## 🔧 Environment Variables

Create a `.env` file in the project root with:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Email (local SMTP)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_user
SMTP_PASSWORD=your_brevo_api_key
SMTP_FROM=your_verified_email@example.com

# App domain
APP_DOMAIN=https://nodejs-hw-mongodb-0l3e.onrender.com

# To skip email sending on Render
RENDER=true
```

---

## 🧪 Testing with Postman

### 🔑 Auth

- `POST /auth/register` — register new user
- `POST /auth/login` — login and get tokens
- `POST /auth/refresh` — refresh access token

### 📩 Password Reset

- `POST /auth/send-reset-email`
  Send body:

  ```json
  { "email": "user@example.com" }
  ```

  ✅ Returns a reset link or sends an email.

- `PATCH /auth/reset-password`

  ```json
  {
    "token": "your_jwt_token",
    "password": "newSecurePassword123"
  }
  ```

### 👥 Contacts

All contacts routes require **Bearer token**:

- `GET /contacts`
- `GET /contacts/:contactId`
- `POST /contacts` (use `multipart/form-data` for image)
- `PATCH /contacts/:contactId`
- `DELETE /contacts/:contactId`

---

## 🧰 Development

```bash
npm install
npm run dev
```

For production:

```bash
npm start
```

---

## 🌍 Deployment

- **Platform:** Render
- **Environment:** Node.js 18+
- **Build Command:**

  ```
  npm install
  ```

- **Start Command:**

  ```
  npm start
  ```

---

## 🧾 License

MIT © 2025 Stanislav Tatarchuk
Vilnius, Lithuania

---
