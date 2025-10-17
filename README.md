# Contacts API (HW7 - Swagger Documentation)

This project is a RESTful API for managing contacts, created as part of the Node.js course homework.  
The API supports authentication, image upload, email verification, and is fully documented with **Swagger UI** and **Redocly**.

---

## 🌐 Live Demo

- **API Base URL:** https://nodejs-hw-mongodb-0l3e.onrender.com
- **Swagger Documentation:** https://nodejs-hw-mongodb-0l3e.onrender.com/api-docs

_(replace with your actual Render links after deployment)_

---

## 🚀 Features

- User registration and login with JWT authentication
- CRUD operations for contacts
- File upload via **Cloudinary**
- Email verification via **SMTP (Brevo)**
- Query parameters for filtering and pagination
- Swagger documentation with Redocly

---

## 🧩 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Multer** (for file uploads)
- **Cloudinary** (image storage)
- **Nodemailer** + **Brevo SMTP** (email service)
- **Swagger UI Express**
- **Redocly CLI**

---

## ⚙️ Installation and Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your_username>/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb

# 2. Install dependencies
npm install

# 3. Create .env file and configure environment variables
cp .env.example .env

# 4. Build Swagger docs
npm run build-docs

# 5. Start the server (development mode)
npm run dev
```

---

## 🧾 Environment Variables (.env)

| Variable                | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `PORT`                  | Server port (default: 3000)                                                  |
| `MONGODB_USER`          | MongoDB username                                                             |
| `MONGODB_PASSWORD`      | MongoDB password                                                             |
| `MONGODB_URL`           | MongoDB cluster URL                                                          |
| `MONGODB_DB`            | Database name                                                                |
| `SMTP_HOST`             | SMTP host (e.g. smtp-relay.brevo.com)                                        |
| `SMTP_PORT`             | SMTP port (587)                                                              |
| `SMTP_USER`             | SMTP username                                                                |
| `SMTP_PASSWORD`         | SMTP password                                                                |
| `SMTP_FROM`             | Sender email address                                                         |
| `JWT_SECRET`            | Secret key for JWT                                                           |
| `APP_DOMAIN`            | Application domain (e.g. `https://nodejs-hw-mongodb-0l3e.onrender.com/auth`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name                                                      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                                                           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                                                        |

---

## 📘 Scripts

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Start server in development mode          |
| `npm run start`      | Start production server                   |
| `npm run build-docs` | Build Swagger documentation using Redocly |

---

## 📖 API Documentation

Swagger documentation is available at:
➡️ **`/api-docs`** endpoint

It includes:

- Contact CRUD endpoints
- Authentication routes (optional)
- File upload (photo)
- Query parameters and response schemas

---

## ✅ Homework Requirements

- Branch name: `hw7-swagger`
- Uses `@redocly/cli` for documentation build
- Contains `openapi.yaml`, `redocly.yaml`, and `index.html`
- Describes all query parameters and request bodies
- Correct response structure:

  ```json
  {
    "status": "success",
    "message": "Contact created successfully",
    "data": { ... }
  }
  ```

---

## 👨‍💻 Author

**Stanislav Tatarchuk**
📍 Vilnius, Lithuania
📧 [stasyk55@gmail.com](mailto:stasyk55@gmail.com)
🔗 [GitHub Profile](https://github.com/StanislavJS)

---
