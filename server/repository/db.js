import { MongoClient } from 'mongodb';

export default async function getDB() {
  const client = new MongoClient(process.env.mongoURL);
  await client.connect();
  const db = client.db(process.env.mongoDatabaseName);
  return db;
}