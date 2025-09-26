import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};
