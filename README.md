hw5-auth
A REST API for managing contacts with JWT authentication and refresh tokens.

## Features

- User registration and login
- JWT access and refresh token authentication
- CRUD operations for contacts
- Environment-based configuration
- Fully tested API endpoints

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- dotenv for environment variables
- Render for deployment

## Environment Variables

Create a `.env` file locally with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/yourDatabaseName
PORT=3000
JWT_ACCESS_SECRET=<your_jwt_access_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
```

On **Render**, add the following environment variables in the dashboard:

- `MONGO_URI` → your MongoDB URI
- `PORT` → 3000
- `JWT_ACCESS_SECRET` → your generated access secret
- `JWT_REFRESH_SECRET` → your generated refresh secret

## Scripts

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Run tests (if any)
npm test

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

- `POST /auth/register` — register a new user
- `POST /auth/login` — login user
- `POST /auth/refresh` — refresh JWT tokens
- `POST /auth/logout` — logout user
- `GET /contacts` — list contacts
- `POST /contacts` — create a contact
- `GET /contacts/:id` — get contact by ID
- `PATCH /contacts/:id` — update contact by ID
- `DELETE /contacts/:id` — delete contact by ID

## Deployment

This project can be deployed on [Render](https://render.com). Make sure to set the environment variables as listed above.

## License

MIT

```


## Author

Stanislav Tatarchuk – Vilnius, Lithuania
GitHub: [https://github.com/StanislavJS](https://github.com/StanislavJS)
Email: [stasyk55@gmail.com](mailto:stasyk55@gmail.com)

---
```
