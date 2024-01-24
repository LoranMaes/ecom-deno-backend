import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";

const client = new MongoClient();
const env = await load();
const dbString = `mongodb+srv://loranmaes:VHh7SDWGD1AXdP3x@cluster0.jljswyp.mongodb.net/?authMechanism=SCRAM-SHA-1`;

let db: Database | null = null;

try {
  await client.connect(dbString);
  db = client.database("deno_auth");
  console.log("Database connected");
} catch (error) {
  console.log("Failed to connect to the database:", error);
  console.log(error);
}

export default db;
