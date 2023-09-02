import { MongoClient } from "mongodb";

let db;
async function connectTODb(cb) {
  const client = new MongoClient(
    process.env.DATABASE
    // `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3hffqu6.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();
  db = client.db("react-blog-db");
  cb();
}
export { db, connectTODb };
