import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";

const client = new MongoClient();
const env = await load();

const dbString = `mongodb+srv://loranmaes:${env["MONGO_DB_PASSWORD"]}@cluster0.jljswyp.mongodb.net/?authMechanism=SCRAM-SHA-1`;

await client.connect(dbString);

console.log("Database connected");

const db = client.database("deno_auth");

export default db;
