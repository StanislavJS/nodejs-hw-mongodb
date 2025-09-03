import 'dotenv/config';
import { setupServer } from './server.mjs';
import { initMongoConnection } from './db/initMongoConnection.mjs';

const start = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Failed to start application:', error.message);
    process.exit(1);
  }
};

start();
