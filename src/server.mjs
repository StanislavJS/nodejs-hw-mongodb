import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {
  getContactsController,
  getContactByIdController,
} from './controllers/contactsController.mjs';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  // Тестовий маршрут
  app.get('/', (req, res) => {
    res.json({ message: 'Hello from API' });
  });

  // Роут для всіх контактів
  app.get('/contacts', getContactsController);

  // Роут для контакту по id
  app.get('/contacts/:contactId', getContactByIdController);

  // Обробка 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
