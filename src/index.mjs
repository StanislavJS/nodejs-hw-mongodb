import 'dotenv/config';
import { setupServer } from './server.mjs';
import { initMongoConnection } from './db/initMongoConnection.mjs';

const start = async () => {
  try {
    await initMongoConnection();
    const app = setupServer();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error.message);
    process.exit(1);
  }
};

start();
