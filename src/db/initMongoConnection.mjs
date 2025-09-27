// src/db/initMongoConnection.mjs
import mongoose from "mongoose";

const buildUri = () => {
  if (process.env.MONGO_URI) return process.env.MONGO_URI;

  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_URL;
  const db = process.env.MONGODB_DB;

  if (!user || !pass || !host || !db) return undefined;

  // mongodb+srv for Atlas
  if (host.includes("mongodb+srv") || host.includes("cluster")) {
    // if host already contains protocol, just trust it
    return `mongodb+srv://${user}:${encodeURIComponent(pass)}@${host}/${db}?retryWrites=true&w=majority`;
  }
  return `mongodb://${user}:${encodeURIComponent(pass)}@${host}/${db}?retryWrites=true&w=majority`;
};

export const initMongoConnection = async () => {
  try {
    const uri = buildUri();
    if (!uri) throw new Error("Mongo connection string is undefined. Set MONGO_URI or MONGODB_* env vars.");

    await mongoose.connect(uri);
    console.log("Mongo connection successfully established!");
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
    process.exit(1);
  }
};
